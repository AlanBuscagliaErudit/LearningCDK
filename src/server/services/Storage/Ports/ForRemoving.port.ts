export interface ForRemoving {
  removeItemFromStorageById(id: string, dbName: string): Promise<void>;
}