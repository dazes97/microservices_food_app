import { IIngredientRepository } from "@domain/repositories/IIngredientRepository.js";
import { IDatabaseAdapter } from "@infrastructure/database/DatabaseAdapater.js";
import { IngredientMapper } from "@infrastructure/mappers/IngredientMapper.js";
import { Ingredient } from "@domain/entities/Ingredient.js";

export class IngredientRepository implements IIngredientRepository {
  constructor(private databaseAdapter: IDatabaseAdapter) {}

  async findByIds(names: number[]): Promise<Ingredient[] | null> {
    const dbConnection = await this.databaseAdapter.getConnection();
    const filteredNames = names.map((e) => '"' + e + '"').join(",  ");
    const query = `SELECT i.id, i.name, s.quantity
        FROM stock s
        INNER JOIN ingredients i
	      ON i.id = s.ingredient_id
	      AND i.deleted_at IS NULL
	      AND i.id IN (${filteredNames})
        WHERE
	      s.deleted_at IS NULL
        FOR UPDATE`;
    const [rows] = await dbConnection.query(query, []);
    return rows.length > 0
      ? rows.map((e: any) => IngredientMapper.toDomain(e))
      : [];
  }
  async reduceQuantity(name: string, amount: number): Promise<void> {
    const dbConnection = await this.databaseAdapter.getConnection();
    await dbConnection.query(
      `UPDATE stock
      SET quantity = quantity - ?
      WHERE ingredient_id = (SELECT id FROM ingredients WHERE name =? AND deleted_at IS NULL)`,
      [amount, name]
    );
  }
  async increaseQuantity(name: string, amount: number): Promise<void> {
    const dbConnection = await this.databaseAdapter.getConnection();
    await dbConnection.query(
      `UPDATE stock
      SET quantity = quantity + ?
      WHERE ingredient_id = (SELECT id FROM ingredients WHERE name =? AND deleted_at IS NULL)`,
      [amount, name]
    );
  }
  async getAllIngredients(): Promise<Ingredient[]> {
    const dbConnection = await this.databaseAdapter.getConnection();
    const [rows] = await dbConnection.query(
      `SELECT i.id, i.name, s.quantity
        FROM stock s
        INNER JOIN ingredients i
	      ON i.id = s.ingredient_id
	      AND i.deleted_at IS NULL
        WHERE
	      s.deleted_at IS NULL`,
      []
    );
    return rows.length > 0
      ? rows.map((e: any) => IngredientMapper.toDomain(e))
      : [];
  }
}
