import { Ingredient } from "@domain/entities/Ingredient.js";

export interface IIngredientRepository {
  findByIds(names: number[]): Promise<Ingredient[] | null>;
  reduceQuantity(name: string, quantity: number): Promise<void>;
  increaseQuantity(name: string, quantity: number): Promise<void>;
  getAllIngredients(): Promise<Ingredient[]>;
}
