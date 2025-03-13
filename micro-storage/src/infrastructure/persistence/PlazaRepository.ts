import { IPlazaRepository } from "@/domain/repositories/IPlazaRepository.js";
import { IDatabaseAdapter } from "@infrastructure/database/DatabaseAdapater.js";
import { PlazaMapper } from "@infrastructure/mappers/PlazaMapper.js";
import { Plaza } from "@domain/entities/Plaza.js";

export class PlazaRepository implements IPlazaRepository {
  constructor(private databaseAdapter: IDatabaseAdapter) {}
  async create(
    orderId: number,
    quantity: number,
    ingredientId: number
  ): Promise<void> {
    const db = await this.databaseAdapter.getConnection();
    await db.query(
      `INSERT INTO plaza (order_id, quantity, ingredient_id) VALUES (?,?,?)`,
      [orderId, quantity, ingredientId]
    );
  }
  async getHistory(): Promise<Plaza[]> {
    const dbConnection = await this.databaseAdapter.getConnection();
    const [rows] = await dbConnection.query(
      `SELECT
            p.id,
            p.order_id AS orderId,
            p.quantity,
            i.name as ingredientName,
            p.created_at AS createdAt
        FROM 
            plaza p
            INNER JOIN ingredients i
            ON i.id = p.ingredient_id
            AND i.deleted_at IS NULL
        WHERE 
        p.deleted_at IS NULL
        ORDER BY
        p.id DESC`,
      []
    );
    return rows.length > 0 ? rows.map((e: any) => PlazaMapper.toDomain(e)) : [];
  }
}
