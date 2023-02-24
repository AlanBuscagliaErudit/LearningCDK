import { StorageService } from "../Domain/Storage.service";
import { ForStoring } from "../Ports/ForStoring.port";

export class Storer implements ForStoring {
  private userTable = process.env.TODO_TABLE_NAME as string;

  constructor(private storageService: StorageService) {}

  async store(data: any): Promise<void> {
    await this.storageService.store(data, this.userTable);
  }
}
