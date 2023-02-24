import { ForRemoving } from "./../Ports/ForRemoving.port";
import { StorageService } from "../Domain/Storage.service";

export class Remover implements ForRemoving {
  constructor(private storageService: StorageService) {}

  async removeItemFromStorageById(id: string, dbName: string): Promise<void> {
    return this.storageService.removeItemFromStorageById(id, dbName);
  }
}