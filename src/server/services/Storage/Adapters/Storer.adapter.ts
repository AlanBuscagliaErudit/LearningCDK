import { StorageService } from "../Domain/Storage.service";
import { ForStoring } from "../Ports/ForStoring.port";

export class Storer implements ForStoring {
  constructor(private storageService: StorageService) {}

  async store(data: any, dbName: string): Promise<void> {
    await this.storageService.store(data,dbName);
  }
}