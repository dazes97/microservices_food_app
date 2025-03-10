import { TransportAdapter } from "@infrastructure/transporter/TransporterAdapter.js";
import { EVENT_LIST } from "@/infrastructure/config/EventList.js";
export class StoragePublisher {
  constructor(private transporter: TransportAdapter) {}
  async publishIngredientsAvailability(
    orderId: number,
    receipeId: number,
    success: boolean
  ) {
    const event = success
      ? EVENT_LIST.RECIPE_COMPLETED
      : EVENT_LIST.RECIPE_FAILED;
    await this.transporter.publish(
      event,
      JSON.stringify({ orderId, receipeId })
    );
    console.log(
      `📢 Enviando Evento: ${event} Orden ${orderId}, Receta ${receipeId}, `
    );
  }
}
