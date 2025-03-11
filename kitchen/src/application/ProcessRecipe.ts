import { IRecipeRepository } from "@domain/repositories/IRecipeRepository.js";
import { KitchenPublisher } from "@infrastructure/transporter/KitchenPublisher.js";

export class ProcessRecipe {
  constructor(
    private recipeRepository: IRecipeRepository,
    private kitchenPublisher: KitchenPublisher
  ) {}
  async execute(orderId: number): Promise<void> {
    try {
      console.log("Processing new order...");
      const recipe = await this.recipeRepository.get();
      await Promise.all([
        this.kitchenPublisher.sendOrderRecipe(orderId, recipe.id, recipe.name),
        this.kitchenPublisher.sendOrderStatusInKitchen(orderId),
        this.kitchenPublisher.sendStockRequest(
          orderId,
          recipe.id,
          recipe.ingredients
        ),
      ]);
    } catch (error) {
      console.error("Error processing order:", error);
    }
  }
}
