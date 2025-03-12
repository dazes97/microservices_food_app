import mysql, { PoolOptions } from "mysql2/promise";
import { IDatabaseAdapter } from "./DatabaseAdapater.js";

export class MySqlAdapter implements IDatabaseAdapter {
  private connection!: mysql.Connection;

  async connect(): Promise<void> {
    const poolOptions: PoolOptions = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
    };
    try {
      this.connection = mysql.createPool(poolOptions);
      console.log("MySQL connected successfully.");
    } catch (error) {
      console.error("MySQL connection error:", error);
      throw error;
    }
  }

  async getConnection(): Promise<mysql.Connection> {
    if (!this.connection) {
      console.error("MySQL connection not established.");
      await this.connect();
    }
    return this.connection;
  }
}
