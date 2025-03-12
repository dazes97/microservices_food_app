import { TransportAdapter } from "@infrastructure/transporter/TransporterAdapter.js";
import { ProcessRecipe } from "@application/ProcessRecipe.js";
export class KitchenSubscriber {
  constructor(
    private transporter: TransportAdapter,
    private processRecipe: ProcessRecipe
  ) {}
  async subscribeToEvents() {
    this.stockRequestQueue();
  }

  async stockRequestQueue() {
    const queueName = process.env.STORAGE_QUEUE_NAME;
    if (!queueName) throw new Error("Orders queue name not defined");
    await this.transporter.consumeQueue(
      queueName,
      async (message: {
        orderId: number;
        recipeId: number;
        ingredients: { id: number; quantity: number }[];
      }) => {
        console.log("[Storage Queue] Procesing:");
        console.log(`Element: ${message}`);
        const { orderId, recipeId, ingredients } = message;
        await this.processRecipe.execute(orderId, recipeId, ingredients);
        console.log("[Storage Queue] Finished");
      }
    );
  }
}
