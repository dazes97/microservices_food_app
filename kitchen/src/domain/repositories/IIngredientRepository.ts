import { Ingredient } from "@domain/entities/Ingredient.js";

export interface IIngredientRepository {
  findByName(name: string): Promise<Ingredient | null>;
  findByNames(names: string[]): Promise<Ingredient[] | null>;
  reduceQuantity(name: string, quantity: number): Promise<void>;
  increaseQuantity(name: string, quantity: number): Promise<void>;
  getAllIngredients(): Promise<Ingredient[]>;
}
