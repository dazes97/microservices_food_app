import { Plaza } from "@domain/entities/Plaza.js";

export interface IPlazaRepository {
  getHistory(): Promise<Plaza[]>;
  create(
    orderId: number,
    quantity: number,
    ingredientId: number
  ): Promise<void>;
}
