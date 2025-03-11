import { OrderDetailMapper } from "../mappers/OderDetailMapper.js";
import { IOrderRepository } from "@domain/repositories/IOrderRepository.js";
import { IDatabaseAdapter } from "../database/DatabaseAdapater.js";
import { Order } from "@domain/entities/Order.js";

export class OrderRepository implements IOrderRepository {
  constructor(private databaseAdapter: IDatabaseAdapter) {}

  async getById(id: number): Promise<Order | null> {
    const db = await this.databaseAdapter.getConnection();
    const [rows] = await db.query(
      `
      SELECT 
        o.id,
        o.recipe_id AS recipeId,
        o.created_at AS createdAt,
        (	SELECT 
          JSON_ARRAYAGG(
            JSON_OBJECT('status',ohs.status,
                    'createdAt',ohs.created_at)
            ) 
        FROM 
          order_history_status ohs
        WHERE 
          ohs.order_id = o.id
          AND ohs.deleted_at IS NULL
        ORDER BY 
          ohs.id DESC
        ) AS history
        FROM 
            orders o
        WHERE
            o.deleted_at IS NULL
            AND o.id = ?
        ORDER BY o.id DESC
      `,
      [id]
    );
    return rows.length > 0 ? OrderDetailMapper.toDomain(rows[0]) : null;
  }
  updateStatus(order: Order): Promise<Order> {
    throw new Error("Method not implemented.");
  }
  async create(): Promise<number> {
    const db = await this.databaseAdapter.getConnection();
    const [result] = await db.query("INSERT INTO orders VALUES();", []);
    return Number(result.insertId);
  }
  update(order: Order): Promise<Order> {
    throw new Error("Method not implemented.");
  }
  async getAll(): Promise<Order[]> {
    const db = await this.databaseAdapter.getConnection();
    const [rows] = await db.query(
      `
      SELECT 
        o.id,
        o.recipe_id AS recipeId,
        o.created_at AS createdAt,
        (	SELECT 
          JSON_ARRAYAGG(
            JSON_OBJECT('status',ohs.status,
                    'createdAt',ohs.created_at)
            ) 
        FROM 
          order_history_status ohs
        WHERE 
          ohs.order_id = o.id
          AND ohs.deleted_at IS NULL
        ORDER BY 
          ohs.id DESC
        ) AS history
        FROM 
            orders o
        WHERE
            o.deleted_at IS NULL
        ORDER BY o.id DESC
      `,
      []
    );
    return rows.length > 0
      ? rows.map((e: any) => OrderDetailMapper.toDomain(e))
      : [];
  }
}
