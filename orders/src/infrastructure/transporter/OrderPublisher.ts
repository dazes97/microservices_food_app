import { TransportAdapter } from "@infrastructure/transporter/TransporterAdapter.js";
export class OrderPublisher {
  constructor(private transporter: TransportAdapter) {}
  async sendOrderRequest(orderId: number) {
    const QUEUE_NAME = process.env.TRANSPORTER_QUEUE_NAME;
    try {
      if (!QUEUE_NAME) throw new Error("Kitchen queue name not defined");
      await this.transporter.sendToQueue(
        QUEUE_NAME,
        JSON.stringify({ orderId })
      );
      console.log(
        `📢 Enviando a la cola ${QUEUE_NAME} Orden ${orderId}, Receta Aun no definida, enviando a la cocina`
      );
    } catch (error) {
      console.error(
        `Error al enviar a la cola ${QUEUE_NAME} Orden ${orderId}:`,
        error
      );
      throw error;
    }
  }
}
