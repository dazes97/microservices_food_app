import { IOrderRepository } from "@domain/repositories/IOrderRepository.js";
import { IDatabaseAdapter } from "@infrastructure/database/DatabaseAdapater.js";
import { OrderPublisher } from "@infrastructure/transporter/OrderPublisher.js";
import { ORDER_STATUS } from "@infrastructure/config/OrderStatusList.js";

export class ProcessOrder {
  constructor(
    private orderRepository: IOrderRepository,
    private orderPublisher: OrderPublisher,
    private databaseAdapter: IDatabaseAdapter
  ) {}
  async execute(): Promise<void> {
    const db = await this.databaseAdapter.getConnection();
    try {
      await db.query("START TRANSACTION;");
      console.log("Processing new order...");
      const insertId = await this.orderRepository.create();
      if (!insertId) throw new Error("Failed to create order");
      await this.orderRepository.updateStatus(
        insertId,
        ORDER_STATUS.IN_PROGRESS
      );
      await this.orderPublisher.sendOrderRequest(insertId);
      await db.query("COMMIT;");
    } catch (error) {
      console.error("Error processing order:", error);
      await db.query("ROLLBACK;");
    }
  }
}
