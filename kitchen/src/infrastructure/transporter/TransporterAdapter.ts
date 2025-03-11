export interface TransportAdapter {
  connect(port: string | number, host: string): Promise<void>;
  publish(topic: string, message: any): Promise<void>;
  subscribe(topic: string, callback: (message: any) => void): void;
  sendToQueue(queueName: string, message: any): Promise<void>;
  consumeQueue(
    queueName: string,
    callback: (message: any) => Promise<void>
  ): Promise<void>;
}
