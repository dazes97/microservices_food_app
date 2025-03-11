import { Recipe } from "@domain/entities/Recipe";

export class RecipeMapper {
  static toDomain(row: any): Recipe {
    return new Recipe(row.id, row.name, row.ingredients, row.createdAt);
  }
}
