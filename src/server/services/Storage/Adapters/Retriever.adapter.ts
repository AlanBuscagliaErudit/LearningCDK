import { ForRetrieving } from "./../Ports/Retriever.port";
import { StorageService } from "../Domain/Storage.service";

export class Retriever implements ForRetrieving {
  private userTable = process.env.TODO_TABLE_NAME as string;

  constructor(private storageService: StorageService) {}

  async retrieveAll<T>(): Promise<T[]> {
    return this.storageService.getFromStorage<T>(this.userTable);
  }
  async retrieveById<T>(id: string): Promise<T> {
    return this.storageService.getItemFromStorageById<T>(id, this.userTable);
  }
}
