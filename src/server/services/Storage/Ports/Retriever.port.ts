export interface ForRetrieving {
  retrieveAll<T>(): Promise<T[]>;
  retrieveById<T>(id: any): Promise<T>;
}
