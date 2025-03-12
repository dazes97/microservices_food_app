import { createClient, RedisClientType } from "redis";
import { TransportAdapter } from "@infrastructure/transporter/TransporterAdapter.js";

export class Redis implements TransportAdapter {
  private _publisher!: RedisClientType;
  private _subscriber!: RedisClientType;
  constructor(private readonly port: string, private readonly host: string) {}
  async connect(): Promise<void> {
    try {
      this._publisher = createClient({
        url: `redis://${this.host}:${this.port}`,
      });
      this._subscriber = createClient({
        url: `redis://${this.host}:${this.port}`,
      });
      await this._publisher.connect();
      await this._subscriber.connect();
    } catch (error) {
      console.error("Error: ", error);
      process.exit(1);
    }
  }
  async publish(topic: string, message: any): Promise<void> {
    await this._publisher.publish(topic, JSON.stringify(message));
  }
  subscribe(topic: string, callback: (message: any) => void): void {
    this._subscriber.subscribe(topic, (message) => {
      callback(JSON.parse(message));
    });
  }
  async consumeQueue(
    queueName: string,
    callback: (message: any) => Promise<void>
  ): Promise<void> {
    console.log(`Listening to queue: ${queueName}...`);
    while (true) {
      const data = await this._subscriber.brPop(queueName, 0);
      if (data) {
        const message = JSON.parse(data.element);
        try {
          console.log("before calling callback");
          await callback(JSON.parse(message));
          console.log("after calling callback");
        } catch (error) {
          // Opcional: reinsertar el mensaje en la cola si falla
          // await this.sendToQueue(queueName, message);
        }
      }
    }
  }
}
