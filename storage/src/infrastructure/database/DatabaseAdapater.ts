export interface IDatabaseAdapter {
  connect(): Promise<void>;
  getConnection(): any;
}

export type DatabaseAdapterStatic = {
  getInstance(): Promise<IDatabaseAdapter>;
};
