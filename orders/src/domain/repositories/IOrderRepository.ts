import { Order } from "../entities/Order";

export interface IOrderRepository {
  create(): Promise<number>;
  updateStatus(order: Order): Promise<Order>;
  getAll(): Promise<Order[]>;
  getById(id: number): Promise<Order | null>;
}
