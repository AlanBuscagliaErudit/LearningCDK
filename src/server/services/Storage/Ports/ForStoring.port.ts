export interface ForStoring {
  store(data: any, dbName: string): Promise<void>;
}