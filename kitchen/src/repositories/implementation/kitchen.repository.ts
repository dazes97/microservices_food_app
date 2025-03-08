import { Order } from "@/models/order.model.js";
import { IOrderRepository } from "@/repositories/interfaces/kitchen.interface.js";

export class OrderRepositoryImpl implements IOrderRepository {
  private orders: Order[] = [];
  async getAll(): Promise<Order[]> {
    return this.orders;
  }
  async create(order: Order): Promise<Order> {
    this.orders.push(order);
    return order;
  }
}
