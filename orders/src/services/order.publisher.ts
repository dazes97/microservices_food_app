import { redisPublisher } from "../redis/redisClient.js";

export class OrderPublisherService {
  async publishOrderEvent(order: any) {
    try {
      await redisPublisher.publish("orders", JSON.stringify(order));
      console.log(`Sending Order To Kitchen:`, order);
    } catch (error) {
      console.error("Error publishing event:", error);
    }
  }
}
