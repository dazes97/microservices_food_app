import { ProcessOrderStatusUpdate } from "@application/ProcessOrderStatusUpdate.js";
import { ProcessOrderRecipe } from "@application/ProcessOrderRecipe.js";
import { TransportAdapter } from "@infrastructure/transporter/TransporterAdapter.js";
import { ORDER_STATUS } from "@infrastructure/config/OrderStatusList.js";
import { EVENT_LIST } from "@infrastructure/config/EventList.js";
export class KitchenSubscriber {
  constructor(
    private transporter: TransportAdapter,
    private processOrderStatusUpdate: ProcessOrderStatusUpdate,
    private processOrderRecipe: ProcessOrderRecipe
  ) {}
  async subscribeToEvents() {
    this.updateOrderRecipe();
    this.updateOrderStatusInKitchen();
    this.updateOrderStatusCompleted();
  }
  async updateOrderRecipe() {
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
  async updateOrderStatusInKitchen() {
    this.transporter.subscribe(
      EVENT_LIST.ORDER_STATUS_IN_KITCHEN,
      async (message: { orderId: number }) => {
        const { orderId } = message;
        console.log(
          `[Orders] actualizando el estado a(${ORDER_STATUS.KITCHEN}) de orderId: ${orderId}`
        );
        await this.processOrderStatusUpdate.execute(
          orderId,
          ORDER_STATUS.KITCHEN
        );
      }
    );
  }
  async updateOrderStatusCompleted() {
    this.transporter.subscribe(
      EVENT_LIST.ORDER_STATUS_COMPLETED,
      async (message: { orderId: number }) => {
        const { orderId } = message;
        console.log(
          `[Orders] actualizando el estado a(${ORDER_STATUS.COMPLETED}) de orderId: ${orderId}`
        );
        await this.processOrderStatusUpdate.execute(
          orderId,
          ORDER_STATUS.COMPLETED
        );
      }
    );
  }
}
