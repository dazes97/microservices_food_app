import { Ingredient } from "@/domain/entities/Ingredient.js";

export class IngredientMapper {
  static toDomain(row: any): Ingredient {
    return new Ingredient(row.id, row.name, row.quantity);
  }

  static toPersistence(ingredient: Ingredient): any {
    return {
      id: ingredient.id,
      name: ingredient.name,
      quantity: ingredient.quantity,
    };
  }
}
