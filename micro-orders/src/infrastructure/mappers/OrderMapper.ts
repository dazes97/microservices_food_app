import { Order } from "@domain/entities/Order.js";

export class IngredientMapper {
  static toDomain(row: any): Order {
    return new Order(row.id, row.recipeId, row.createdAt);
  }

  static toPersistence(order: Order): any {
    return {
      id: order.id,
      recipeId: order.recipeId,
      createdAt: order.createdAt,
    };
  }
}
