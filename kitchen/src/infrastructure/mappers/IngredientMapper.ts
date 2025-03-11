import { Ingredient } from "@/domain/entities/Ingredient.js";

export class IngredientMapper {
  static toDomain(row: any): Ingredient {
    return new Ingredient(row.name, row.quantity);
  }

  static toPersistence(ingredient: Ingredient): any {
    return {
      name: ingredient.name,
      quantity: ingredient.quantity,
    };
  }
}
