export interface ForRemovingProduct {
  removeProduct(id: string): Promise<void>;
}