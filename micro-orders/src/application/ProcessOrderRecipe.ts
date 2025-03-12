import { IDatabaseAdapter } from "@infrastructure/database/DatabaseAdapater";
import { IOrderRepository } from "@domain/repositories/IOrderRepository.js";

export class ProcessOrderRecipe {
  constructor(
    private ingredientService: IOrderRepository,
    private databaseAdapter: IDatabaseAdapter
  ) {}
  async execute(
    orderId: number,
    recipeId: number,
    recipeName: string
  ): Promise<void> {
    const db = await this.databaseAdapter.getConnection();
    try {
      await db.query("START TRANSACTION");
      await this.ingredientService.updateRecipe(orderId, recipeId, recipeName);
      console.log(`Order ${orderId} updated with recipe ${recipeName}`);
      await db.query("COMMIT");
    } catch (error) {
      console.error("Error processing order recipe", error);
      await db.query("ROLLBACK");
    }
  }
}
