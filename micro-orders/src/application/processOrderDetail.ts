import { IOrderRepository } from "@domain/repositories/IOrderRepository.js";
import { Order } from "@domain/entities/Order.js";

export class ProcessOrderDetail {
  constructor(private orderRepository: IOrderRepository) {}
  async execute(orderId: number): Promise<Order | null> {
    try {
      return await this.orderRepository.getById(orderId);
    } catch (error) {
      console.error("Error getting order details:", error);
      return null;
    }
  }
}
