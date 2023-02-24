import { ForRetrieving } from "./../Ports/Retriever.port";
import { StorageService } from "../Domain/Storage.service";

export class Retriever implements ForRetrieving {
  constructor(private storageService: StorageService) {}

  async retrieveAll<T>(dbName: string): Promise<T[]> {
    return this.storageService.getFromStorage<T>(dbName);
  }
  async retrieveById<T>(id: string, dbName: string): Promise<T> {
    return this.storageService.getItemFromStorageById<T>(id, dbName);
  }
}