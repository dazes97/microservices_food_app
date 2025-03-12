import { Recipe } from "@domain/entities/Recipe.js";
export interface IRecipeRepository {
  get(): Promise<Recipe>;
}
