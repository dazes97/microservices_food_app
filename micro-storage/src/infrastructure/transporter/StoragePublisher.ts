import { TransportAdapter } from "@infrastructure/transporter/TransporterAdapter.js";
import { EVENT_LIST } from "@infrastructure/config/EventList.js";
export class StoragePublisher {
  constructor(private transporter: TransportAdapter) {}
  async sendOrderStatusCompleted(orderId: number) {
    await this.transporter.publish(
      EVENT_LIST.ORDER_STATUS_COMPLETED,
      JSON.stringify({ orderId })
    );
  }
}
