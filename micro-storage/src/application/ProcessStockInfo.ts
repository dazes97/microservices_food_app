import { IIngredientRepository } from "@domain/repositories/IIngredientRepository.js";

export class ProcessStockInfo {
  onlyOnce: boolean = false;
  constructor(private ingredientRepository: IIngredientRepository) {}

  async execute() {
    return await this.ingredientRepository.getAllIngredients();
  }
}
