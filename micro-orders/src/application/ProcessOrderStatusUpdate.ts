import { IDatabaseAdapter } from "@infrastructure/database/DatabaseAdapater";
import { IOrderRepository } from "@domain/repositories/IOrderRepository.js";

export class ProcessOrderStatusUpdate {
  constructor(
    private orderRepository: IOrderRepository,
    private databaseAdapter: IDatabaseAdapter
  ) {}
  async execute(orderId: number, newStatus: string): Promise<void> {
    const db = await this.databaseAdapter.getConnection();
    try {
      await db.query("START TRANSACTION");
      await this.orderRepository.updateStatus(orderId, newStatus);
      await db.query("COMMIT");
    } catch (error) {
      console.error("Error updating order status:", error);
      await db.query("ROLLBACK");
    }
  }
}
