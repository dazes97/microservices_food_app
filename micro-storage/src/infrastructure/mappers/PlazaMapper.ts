import { Plaza } from "@/domain/entities/Plaza.js";

export class PlazaMapper {
  static toDomain(row: any): Plaza {
    return new Plaza(
      row.id,
      row.orderId,
      row.quantity,
      row.ingredientName,
      row.createdAt
    );
  }
}
