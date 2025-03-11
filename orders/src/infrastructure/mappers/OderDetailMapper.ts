import { OrderDetail } from "@domain/entities/OrderDetail";

export class OrderDetailMapper {
  static toDomain(row: any): OrderDetail {
    return new OrderDetail(row.id, row.recipeId, row.createdAt, row.history);
  }

  static toPersistence(orderDetail: OrderDetail): any {
    return {
      id: orderDetail,
      recipeId: orderDetail.recipeId,
      createdAt: orderDetail.createdAt,
      history: orderDetail.history,
    };
  }
}
