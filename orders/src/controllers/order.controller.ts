import { IncomingMessage, ServerResponse } from "http";
import { OrderService } from "@/services/order.service.js";

export class OrderController {
  private orderService: OrderService;
  constructor() {
    this.orderService = new OrderService();
  }

  async getOrders(req: IncomingMessage, res: ServerResponse) {
    const orders = await this.orderService.getAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(orders));
  }

  async createOrder(req: IncomingMessage, res: ServerResponse, body: any) {
    const newOrder = await this.orderService.create(body);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newOrder));
  }
}
