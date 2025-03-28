import { TransportAdapter } from "@infrastructure/transporter/TransporterAdapter";
import { ProcessRecipe } from "@application/ProcessRecipe";

export class OrderSubscriber {
  constructor(
    private transporter: TransportAdapter,
    private processRecipe: ProcessRecipe
  ) {}
  async subscribeToEvents() {
    this.recipeRequestQueue();
  }
  async recipeRequestQueue() {
    const queueName = process.env.ORDERS_QUEUE_NAME;
    if (!queueName) throw new Error("Orders queue name not defined");
    await this.transporter.consumeQueue(queueName, async (message) => {
      const { orderId } = message;
      console.log(`[Kitchen] Processing ${message}...`);
      await this.processRecipe.execute(orderId);
      console.log(`[Kitchen] Order ${message} completed.`);
    });
  }
}
