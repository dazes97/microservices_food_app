import { StoragePublisher } from "@infrastructure/transporter/StoragePublisher.js";
import { IIngredientRepository } from "@domain/repositories/IIngredientRepository.js";
import { IDatabaseAdapter } from "@infrastructure/database/DatabaseAdapater.js";
import { PlazaClient } from "@infrastructure/http/PlazaClient.js";

interface IStockVerification {
  name: string;
  inStock: number;
  required: number;
}
export class ProcessRecipe {
  constructor(
    private ingredientRepository: IIngredientRepository,
    private plazaClient: PlazaClient,
    private storagePublisher: StoragePublisher,
    private databaseAdapter: IDatabaseAdapter
  ) {}

  async execute(
    orderId: number,
    recipeId: number,
    requiredIngredients: { id: number; quantity: number }[]
  ) {
    console.log(
      `=========================== STARTING TRANSACTION ORDER: ${orderId}===========================`
    );
    const db = await this.databaseAdapter.getConnection();
    await db.query("START TRANSACTION");
    try {
      let allAvailableFlag = true;
      let stockVerification: IStockVerification[] = [];
      let foundIngredients = await this.ingredientRepository.findByIds(
        requiredIngredients.map((i) => i.id)
      );
      if (!foundIngredients) {
        throw new Error("No hay ingredientes en la base de datos.");
      }
      // if some ingredients are not found, stop the process
      if (foundIngredients.length !== requiredIngredients.length) return;

      for (const foundIngredient of foundIngredients) {
        const requiredIngredient = requiredIngredients.find(
          (i) => i.id === foundIngredient.id
        );
        if (requiredIngredient) {
          stockVerification.push({
            name: foundIngredient.name,
            inStock: foundIngredient.quantity,
            required: requiredIngredient.quantity,
          });
        } else {
          throw new Error(`No se encontro el ingrediente en la base de datos.`);
        }
      }
      console.log("Stock actualizados:", stockVerification);
      for (const detail of stockVerification) {
        let stockFlag: boolean = true;
        let cart: number = 0;
        while (stockFlag) {
          if (cart + detail.inStock < detail.required) {
            console.log(
              "no hay suficiente stock en la base de datos, intentando comprar....."
            );
            const { name, quantitySold } = await this.plazaClient.buyIngredient(
              detail.name
            );
            console.log(` Comprando ${quantitySold} de ${name} en la Plaza...`);
            if (quantitySold > 0) {
              await this.ingredientRepository.increaseQuantity(
                detail.name,
                quantitySold
              );
              cart += quantitySold;
              console.log(
                `Stock actualizado: ${detail.name} -> ${detail.inStock + cart}`
              );
            }
          } else {
            console.log(`Stock disponible dejando de comprar`);
            stockFlag = false;
          }
        }
      }
      if (!allAvailableFlag) {
        throw new Error("No hay suficiente stock. No se aplicarán cambios.");
      }
      foundIngredients = await this.ingredientRepository.findByIds(
        requiredIngredients.map((i) => i.id)
      );
      if (!foundIngredients) {
        throw new Error("No hay ingredientes en la base de datos.");
      }

      stockVerification = [];
      if (foundIngredients.length === requiredIngredients.length) {
        for (const foundIngredient of foundIngredients) {
          const requiredIngredient = requiredIngredients.find(
            (i) => i.id === foundIngredient.id
          );
          if (requiredIngredient) {
            allAvailableFlag = foundIngredient.isAvailable(
              requiredIngredient.quantity
            );
            if (!allAvailableFlag) {
              throw new Error("No hay ingredientes en la base de datos.");
            }
            stockVerification.push({
              name: foundIngredient.name,
              inStock: foundIngredient.quantity,
              required: requiredIngredient.quantity,
            });
          }
        }
      }
      console.log("Stock actualizados:", stockVerification);
      for (const detail of stockVerification) {
        await this.ingredientRepository.reduceQuantity(
          detail.name,
          detail.required
        );
        console.log(
          `Stock actualizado: ${detail.name} -> ${
            detail.inStock - detail.required
          }`
        );
      }
      console.log("Stock reducido correctamente.");
      setTimeout(async () => {
        await this.storagePublisher.sendOrderStatusCompleted(orderId);
      }, 5000);
      await db.query("COMMIT");
      console.log(
        "=========================== ENDING TRANSACTION ==========================="
      );
    } catch (error) {
      console.error(error);
      await db.query("ROLLBACK");
      // await this.storagePublisher.sendOrderStatusCompleted(
      //   orderId,
      // );
      console.log(
        "=========================== ENDING TRANSACTION ==========================="
      );
    }
  }
}
