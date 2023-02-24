export interface ForCreating {
  createItem: <T>(item: T, dbName: string) => Promise<void>;
}
