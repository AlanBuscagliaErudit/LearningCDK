import { StorageService } from "./../Domain/Storage.service";
import { ForCreating } from "../Ports/ForCreating.port";

export class Creator implements ForCreating {
  constructor(private storageService: StorageService) {}

  async createItem<T>(item: T, dbName: string): Promise<void> {
    await this.storageService.createItem(item, dbName);
  }
}
