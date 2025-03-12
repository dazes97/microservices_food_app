import { OrderDetail } from "@domain/entities/OrderDetail.js";

export class OrderDetailMapper {
  static toDomain(row: any): OrderDetail {
    return new OrderDetail(
      row.id,
      row.recipeName,
      row.recipeId,
      row.createdAt,
      row.history
    );
  }

  static toPersistence(orderDetail: OrderDetail): any {
    return {
      id: orderDetail,
      recipeName: orderDetail.recipeName,
      recipeId: orderDetail.recipeId,
      createdAt: orderDetail.createdAt,
      history: orderDetail.history,
    };
  }
}
