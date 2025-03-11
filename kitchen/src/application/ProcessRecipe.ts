import { StoragePublisher } from "@/infrastructure/transporter/StoragePublisher.js";
import { IIngredientRepository } from "@domain/repositories/IIngredientRepository.js";
import { IDatabaseAdapter } from "@/infrastructure/database/DatabaseAdapater.js";
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
    requiredIngredients: { name: string; quantity: number }[]
  ) {
    console.log(
      `=========================== STARTING TRANSACTION ORDER: ${orderId}===========================`
    );
    const db = await this.databaseAdapter.getConnection();
    await db.query("START TRANSACTION");
    try {
      let allAvailableFlag = true;
      let stockVerification: IStockVerification[] = [];
      let foundIngredients = await this.ingredientRepository.findByNames(
        requiredIngredients.map((i) => i.name)
      );
      if (!foundIngredients) {
        throw new Error("No hay ingredientes en la base de datos.");
      }
      // if some ingredients are not found, stop the process
      if (foundIngredients.length !== requiredIngredients.length) return;

      for (const foundIngredient of foundIngredients) {
        const requiredIngredient = requiredIngredients.find(
          (i) => i.name === foundIngredient.name
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
        if (detail.inStock < detail.required) {
          const { name, quantitySold } = await this.plazaClient.buyIngredient(
            detail.name
          );
          console.log(` Comprando ${quantitySold} de ${name} en la Plaza...`);
          if (quantitySold === 0) {
            throw new Error(`Can not get from the plaza ${name}`);
          }
          await this.ingredientRepository.increaseQuantity(
            detail.name,
            quantitySold
          );
          console.log(
            `Stock actualizado: ${detail.name} -> ${
              detail.inStock + quantitySold
            }`
          );
        }
      }
      if (!allAvailableFlag) {
        throw new Error("No hay suficiente stock. No se aplicarán cambios.");
      }
      foundIngredients = await this.ingredientRepository.findByNames(
        requiredIngredients.map((i) => i.name)
      );
      if (!foundIngredients) {
        throw new Error("No hay ingredientes en la base de datos.");
      }

      stockVerification = [];
      if (foundIngredients.length === requiredIngredients.length) {
        for (const foundIngredient of foundIngredients) {
          const requiredIngredient = requiredIngredients.find(
            (i) => i.name === foundIngredient.name
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
        await this.storagePublisher.publishIngredientsAvailability(
          orderId,
          recipeId,
          allAvailableFlag
        );
      }, 5000);
      await db.query("COMMIT");
      console.log(
        "=========================== ENDING TRANSACTION ==========================="
      );
    } catch (error) {
      console.error(error);
      await db.query("ROLLBACK");
      await this.storagePublisher.publishIngredientsAvailability(
        orderId,
        recipeId,
        false
      );
      console.log(
        "=========================== ENDING TRANSACTION ==========================="
      );
    }
  }
}
