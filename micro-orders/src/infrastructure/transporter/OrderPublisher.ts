import { TransportAdapter } from "@infrastructure/transporter/TransporterAdapter.js";
export class OrderPublisher {
  constructor(private transporter: TransportAdapter) {}
  async sendOrderRequest(orderId: number) {
    const QUEUE_NAME = process.env.ORDERS_QUEUE_NAME;
    try {
      if (!QUEUE_NAME) throw new Error("Kitchen queue name not defined");
      await this.transporter.sendToQueue(
        QUEUE_NAME,
        JSON.stringify({ orderId })
      );
      console.log(
        `Sending to queue ${QUEUE_NAME} order ${orderId}, recipe not defined, sending to kitchen`
      );
    } catch (error) {
      console.error(
        `Error to send to queue ${QUEUE_NAME} order ${orderId}:`,
        error
      );
      throw error;
    }
  }
}
