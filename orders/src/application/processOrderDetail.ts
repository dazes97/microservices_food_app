import { IOrderRepository } from "@domain/repositories/IOrderRepository.js";
import { Order } from "@domain/entities/Order.js";

export class ProcessOrderDetail {
  constructor(private orderRepository: IOrderRepository) {}
  async execute(orderId: number): Promise<Order | null> {
    return await this.orderRepository.getById(orderId);
  }
}
