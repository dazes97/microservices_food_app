import { OrderPublisherService } from "./kitchen.publisher.js";
import { OrderRepositoryImpl } from "../repositories/implementation/kitchen.repository.js";
import { Order } from "../models/order.model.js";

export class OrderService {
  private id: number = 1;
  private readonly orderRepository: OrderRepositoryImpl;
  private readonly orderPublisherService: OrderPublisherService;

  constructor() {
    this.orderRepository = new OrderRepositoryImpl();
    this.orderPublisherService = new OrderPublisherService();
  }

  async getAll() {
    return await this.orderRepository.getAll();
  }

  async create(orderData: any) {
    const newOrder: Order = {
      id: this.id,
      receipe: null,
      status: "pending",
    };
    this.id++;
    const orderCreated = await this.orderRepository.create(newOrder);
    await this.orderPublisherService.publishOrderEvent(orderCreated);
    console.log("Order created:", orderCreated);
    return orderCreated;
  }
}
