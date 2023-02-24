export interface ForStoring {
  store<T>(data: T): Promise<void>;
}
