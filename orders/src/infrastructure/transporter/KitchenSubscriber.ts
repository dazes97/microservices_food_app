import { ProcessOrderStatusUpdate } from "@application/ProcessOrderStatusUpdate.js";
import { ProcessOrderRecipe } from "@application/ProcessOrderRecipe.js";
import { TransportAdapter } from "@infrastructure/transporter/TransporterAdapter";
import { EVENT_LIST } from "@infrastructure/config/EventList.js";
export class KitchenSubscriber {
  constructor(
    private transporter: TransportAdapter,
    private processOrderStatusUpdate: ProcessOrderStatusUpdate,
    private processOrderRecipe: ProcessOrderRecipe
  ) {}
  async subscribeToKitchenEvents() {
    this.updateOrderStatusEvent();
    this.updateOrderRecipeEvent();
  }
  async updateOrderRecipeEvent() {
    this.transporter.subscribe(
      EVENT_LIST.ORDER_ASSIGNED,
      async (message: {
        orderId: number;
        recipeId: number;
        recipeName: string;
      }) => {
        const { orderId, recipeId, recipeName } = message;
        await this.processOrderRecipe.execute(orderId, recipeId, recipeName);
      }
    );
  }
  async updateOrderStatusEvent() {
    this.transporter.subscribe(
      EVENT_LIST.ORDER_STATUS,
      async (message: { status: string; orderId: number }) => {
        const { orderId, status } = message;
        console.log("orderId: ", orderId, "Status: ", status);
        await this.processOrderStatusUpdate.execute(orderId, status);
      }
    );
  }
}
