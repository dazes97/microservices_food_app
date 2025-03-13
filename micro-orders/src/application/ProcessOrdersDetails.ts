import { IOrderRepository } from "@domain/repositories/IOrderRepository.js";

export class ProcessOrdersList {
  constructor(private orderDetailRepository: IOrderRepository) {}
  async execute() {
    try {
      return await this.orderDetailRepository.getAll();
    } catch (error) {
      console.error("Error getting orders details:", error);
    }
  }
}
