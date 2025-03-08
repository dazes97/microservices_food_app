import { redisSubscriber } from "../redis/redisClient.js";

export class OrderSubscriberService {
  async subscribeToEvents() {
    await this.subscribeToOrderEvents();
  }
  async subscribeToOrderEvents() {
    try {
      console.log("Subscribed to orders channel...");
      await redisSubscriber.subscribe("orders", (message) => {
        console.log(`Received Order Event:`, JSON.parse(message));
      });
    } catch (error) {
      console.error("Error subscribing to orders:", error);
    }
  }
}
