export interface ForRetrieving {
  retrieveAll<T>(dbName: string): Promise<T[]>;
  retrieveById<T>(id: any, dbName: string): Promise<T>;
}