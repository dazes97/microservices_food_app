import { OrderDetailMapper } from "@/infrastructure/mappers/OrderDetailMapper.js";
import { IOrderRepository } from "@domain/repositories/IOrderRepository.js";
import { IDatabaseAdapter } from "@infrastructure/database/DatabaseAdapater.js";
import { OrderDetail } from "@domain/entities/OrderDetail.js";
import { Order } from "@domain/entities/Order.js";

export class OrderRepository implements IOrderRepository {
  constructor(private databaseAdapter: IDatabaseAdapter) {}
  async getById(id: number): Promise<OrderDetail | null> {
    const db = await this.databaseAdapter.getConnection();
    const [rows] = await db.query(
      `
      SELECT 
        o.id,
        o.recipe_name AS recipeName,
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
  async updateStatus(id: number, status: string): Promise<void> {
    const db = await this.databaseAdapter.getConnection();
    await db.query(
      `INSERT INTO order_history_status (status, order_id) VALUES (?,?);`,
      [status, id]
    );
  }
  async updateRecipe(
    id: number,
    recipeId: number,
    recipeName: string
  ): Promise<void> {
    const db = await this.databaseAdapter.getConnection();
    await db.query(
      `UPDATE orders SET recipe_id =?, recipe_name =? WHERE id =?;`,
      [recipeId, recipeName, id]
    );
  }
  async create(): Promise<number> {
    const db = await this.databaseAdapter.getConnection();
    const [row] = await db.query("INSERT INTO orders VALUES();", []);
    return row.insertId;
  }
  update(order: Order): Promise<Order> {
    throw new Error("Method not implemented.");
  }
  async getAll(): Promise<OrderDetail[]> {
    const db = await this.databaseAdapter.getConnection();
    const [rows] = await db.query(
      `
      SELECT 
        o.id,
        o.recipe_name AS recipeName,
        o.recipe_id AS recipeId,
        DATE_FORMAT(o.created_at, '%Y-%m-%dT%H:%i:%sZ') AS createdAt,
        (	SELECT 
          JSON_ARRAYAGG(
            JSON_OBJECT('status',ohs.status,
                    'createdAt',DATE_FORMAT(ohs.created_at, '%Y-%m-%dT%H:%i:%sZ'))
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
