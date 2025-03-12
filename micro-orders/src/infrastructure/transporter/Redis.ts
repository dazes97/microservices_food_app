import { createClient, RedisClientType } from "redis";
import { TransportAdapter } from "@infrastructure/transporter/TransporterAdapter.js";

export class Redis implements TransportAdapter {
  private publisher!: RedisClientType;
  private subscriber!: RedisClientType;
  constructor(private readonly port: string, private readonly host: string) {}

  async connect(): Promise<void> {
    try {
      this.publisher = createClient({
        url: `redis://${this.host}:${this.port}`,
      });
      this.subscriber = createClient({
        url: `redis://${this.host}:${this.port}`,
      });
      await this.publisher.connect();
      await this.subscriber.connect();
    } catch (error) {
      console.error("Error: ", error);
      process.exit(1);
    }
  }
  
  async publish(topic: string, message: any): Promise<void> {
    await this.publisher.publish(topic, JSON.stringify(message));
  }

  subscribe(topic: string, callback: (message: any) => void): void {
    this.subscriber.subscribe(topic, (message) => {
      const data = JSON.parse(message);
      callback(JSON.parse(data));
    });
  }

  async sendToQueue(queueName: string, message: any): Promise<void> {
    await this.publisher.lPush(queueName, JSON.stringify(message));
  }
}
