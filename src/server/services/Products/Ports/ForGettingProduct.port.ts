import { Product } from "../Domain/Product.service";

export interface ForGettingProduct {
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product>;
}
