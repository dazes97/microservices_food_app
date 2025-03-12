export interface IDatabaseAdapter {
  connect(): Promise<void>;
  getConnection(): any;
}