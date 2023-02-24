export interface ForRemoving {
  removeItemFromStorageById(id: string): Promise<void>;
}
