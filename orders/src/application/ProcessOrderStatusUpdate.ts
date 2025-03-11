import { IOrderRepository } from "@domain/repositories/IOrderRepository.js";

export class ProcessOrderStatusUpdate {
  constructor(private orderRepository: IOrderRepository) {}
  async execute(orderId: number, newStatus: string): Promise<void> {
    try {
      await this.orderRepository.updateStatus(orderId, newStatus);
      console.log(`Order ${orderId} updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  }
}
