import { Order } from "@/models/order.model.js";
export interface IOrderRepository {
  getAll(): Promise<Order[]>;
  create(order: Order): Promise<Order>;
}
