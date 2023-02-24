import { StorageService } from "./../Domain/Storage.service";
import { ForCreating } from "../Ports/ForCreating.port";

export class Creator implements ForCreating {
  private userTable = process.env.TODO_TABLE_NAME as string;

  constructor(private storageService: StorageService) {}

  async createItem<T>(item: T): Promise<void> {
    await this.storageService.createItem(item, this.userTable);
  }
}
