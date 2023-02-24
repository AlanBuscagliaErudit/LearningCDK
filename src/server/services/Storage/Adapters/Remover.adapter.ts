import { ForRemoving } from "./../Ports/ForRemoving.port";
import { StorageService } from "../Domain/Storage.service";

export class Remover implements ForRemoving {
  private userTable = process.env.TODO_TABLE_NAME as string;

  constructor(private storageService: StorageService) {}

  async removeItemFromStorageById(id: string): Promise<void> {
    return this.storageService.removeItemFromStorageById(id, this.userTable);
  }
}
