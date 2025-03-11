import { TransportAdapter } from "@infrastructure/transporter/TransporterAdapter";
import { ProcessRecipe } from "@application/ProcessRecipe";

export class OrderSubscriber {
  constructor(
    private transporter: TransportAdapter,
    private processRecipe: ProcessRecipe
  ) {}
  async subscribeToEvents() {
    this.subscribeToRecipeEvent();
  }
  async subscribeToRecipeEvent() {
    const queueName = process.env.ORDERS_QUEUE_NAME;
    if (!queueName) throw new Error("Orders queue name not defined");
    await this.transporter.consumeQueue(queueName, async (message) => {
      const { orderId } = message;
      console.log(`[Kitchen] Procesando orden ${message}...`);
      await this.processRecipe.execute(orderId);
      console.log(`[Kitchen] Orden ${message} procesada.`);
    });
  }
}
