import { IOrderRepository } from "@domain/repositories/IOrderRepository.js";
import { OrderPublisher } from "@infrastructure/transporter/OrderPublisher.js";

export class ProcessOrder {
  constructor(
    private orderRepository: IOrderRepository,
    private orderPublisher: OrderPublisher
  ) {}
  async execute(): Promise<void> {
    try {
      console.log("Processing new order...");
      const insertId = await this.orderRepository.create();
      console.log("Order created with ID:", insertId);
      if (!insertId) throw new Error("Failed to create order");
      await this.orderPublisher.sendOrderRequest(insertId);
    } catch (error) {
      console.error("Error processing order:", error);
    }
  }
}
