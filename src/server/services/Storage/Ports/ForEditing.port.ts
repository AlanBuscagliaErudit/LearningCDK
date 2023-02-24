export interface ForEditing {
  updateItemFromStorageById<T>(item: T, dbName: string): Promise<void>;
}