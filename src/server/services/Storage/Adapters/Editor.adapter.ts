import { StorageService } from "../Domain/Storage.service";
import { ForEditing } from "../Ports/ForEditing.port";

export class Editor implements ForEditing {
  private userTable = process.env.TODO_TABLE_NAME as string;

  constructor(private storageService: StorageService) {}

  async updateItemFromStorageById<T>(item: T): Promise<void> {
    return this.storageService.updateItemFromStorageById(item, this.userTable);
  }
}
