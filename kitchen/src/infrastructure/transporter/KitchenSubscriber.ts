import { TransportAdapter } from "@infrastructure/transporter/TransporterAdapter";
import { ProcessRecipe } from "@application/ProcessRecipe.js";
import { EVENT_LIST } from "@infrastructure/config/EventList.js";
export class KitchenSubscriber {
  constructor(
    private transporter: TransportAdapter,
    private processRecipe: ProcessRecipe
  ) {}
  async subscribeToKitchenEvents() {
    this.ingredientsAvailabilityEvent();
  }
  async ingredientsAvailabilityEvent() {
    this.transporter.subscribe(
      EVENT_LIST.RECIPE_ASSIGNED,
      async (message: {
        orderId: number;
        recipeId: number;
        ingredients: { name: string; quantity: number }[];
      }) => {
        const { orderId, recipeId, ingredients } = message;
        await this.processRecipe.execute(orderId, recipeId, ingredients);
      }
    );
  }
}
