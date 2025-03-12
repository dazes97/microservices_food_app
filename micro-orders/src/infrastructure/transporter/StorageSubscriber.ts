import { ProcessOrderStatusUpdate } from "@application/ProcessOrderStatusUpdate.js";
import { ProcessOrderRecipe } from "@application/ProcessOrderRecipe.js";
import { TransportAdapter } from "@infrastructure/transporter/TransporterAdapter.js";
import { ORDER_STATUS } from "@infrastructure/config/OrderStatusList.js";
import { EVENT_LIST } from "@infrastructure/config/EventList.js";
export class StorageSubscriber {
  constructor(
    private transporter: TransportAdapter,
    private processOrderStatusUpdate: ProcessOrderStatusUpdate,
    private processOrderRecipe: ProcessOrderRecipe
  ) {}
  async subscribeToEvents() {
    this.updateOrderStatusCompleted();
  }
  async updateOrderStatusCompleted() {
    this.transporter.subscribe(
      EVENT_LIST.ORDER_STATUS_COMPLETED,
      async (message: { orderId: number }) => {
        const { orderId } = message;
        console.log(
          `[Orders] Updating statusto (${ORDER_STATUS.COMPLETED}) order: ${orderId}`
        );
        await this.processOrderStatusUpdate.execute(
          orderId,
          ORDER_STATUS.COMPLETED
        );
      }
    );
  }
}
