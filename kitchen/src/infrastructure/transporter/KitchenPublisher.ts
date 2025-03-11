import { TransportAdapter } from "@infrastructure/transporter/TransporterAdapter.js";
import { EVENT_LIST } from "../config/EventList";
export class KitchenPublisher {
  constructor(private transporter: TransportAdapter) {}
  async sendStockRequest(
    orderId: number,
    recipeId: number,
    ingredients: { id: number; quantity: number }[]
  ) {
    const QUEUE_NAME = process.env.STORAGE_QUEUE_NAME;
    try {
      if (!QUEUE_NAME) throw new Error("Kitchen queue name not defined");
      await this.transporter.sendToQueue(
        QUEUE_NAME,
        JSON.stringify({ orderId, recipeId, ingredients })
      );
      console.log(
        `Enviando a la cola ${QUEUE_NAME} Orden ${orderId} Requerimiento de stock...`
      );
    } catch (error) {
      console.error(
        `Error al enviar a la cola ${QUEUE_NAME} Orden ${orderId}:`,
        error
      );
      throw error;
    }
  }
  async sendOrderRecipe(orderId: number, recipeId: number, recipeName: string) {
    await this.transporter.publish(
      EVENT_LIST.ORDER_ASSIGNED,
      JSON.stringify({ orderId, recipeId, recipeName })
    );
  }
  async sendOrderStatusInKitchen(orderId: number) {
    await this.transporter.publish(
      EVENT_LIST.ORDER_STATUS_IN_KITCHEN,
      JSON.stringify({ orderId })
    );
  }
}
