import { StorageService } from "../Domain/Storage.service";
import { ForEditing } from "../Ports/ForEditing.port";

export class Editor implements ForEditing {
  constructor(private storageService: StorageService) {}

  async updateItemFromStorageById<T>(item: T, dbName: string): Promise<void> {
    return this.storageService.updateItemFromStorageById(item, dbName);
  }
}