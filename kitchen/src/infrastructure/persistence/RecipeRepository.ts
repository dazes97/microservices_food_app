import { RecipeMapper } from "@infrastructure/mappers/RecipeMapper.js";
import { IRecipeRepository } from "@domain/repositories/IRecipeRepository.js";
import { IDatabaseAdapter } from "@infrastructure/database/DatabaseAdapater.js";
import { Recipe } from "@domain/entities/Recipe";

export class RecipeRepository implements IRecipeRepository {
  constructor(private databaseAdapter: IDatabaseAdapter) {}
  async get(): Promise<Recipe> {
    const db = await this.databaseAdapter.getConnection();
    const [rows] = await db.query(
      `
      SELECT 
	      r.id, 
        r.name, 
        (SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
              'id',ri.ingredient_id,
              'quantity',ri.quantity	
            )
          ) 
          FROM
            recipe_ingredient ri
            WHERE 
            ri.recipe_id = r.id
            AND ri.deleted_at IS NULL
            ) AS ingredients
      FROM 
        recipes r
      WHERE 
        r.deleted_at IS NULL
      ORDER BY 
        RAND()
      LIMIT 1
      `,
      []
    );
    return RecipeMapper.toDomain(rows[0]);
  }
}
