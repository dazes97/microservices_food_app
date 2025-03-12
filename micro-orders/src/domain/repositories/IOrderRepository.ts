import { OrderDetail } from "@domain/entities/OrderDetail.js";
export interface IOrderRepository {
  create(): Promise<number>;
  updateRecipe(id: number, recipeId: number, recipeName: string): Promise<void>;
  updateStatus(id: number, status: string): Promise<void>;
  getAll(): Promise<OrderDetail[]>;
  getById(id: number): Promise<OrderDetail | null>;
}
