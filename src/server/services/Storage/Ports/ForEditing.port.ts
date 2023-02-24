export interface ForEditing {
  updateItemFromStorageById<T>(item: T): Promise<void>;
}
