import { IOrderRepository } from "@domain/repositories/IOrderRepository.js";

export class ProcessOrderRecipe {
  constructor(private ingredientService: IOrderRepository) {}
  async execute(
    orderId: number,
    recipeId: number,
    recipeName: string
  ): Promise<void> {
    try {
      await this.ingredientService.updateRecipe(orderId, recipeId, recipeName);
      console.log(`Order ${orderId} updated with recipe ${recipeName}`);
    } catch (error) {
      console.error("Error processing order recipe", error);
    }
  }
}
