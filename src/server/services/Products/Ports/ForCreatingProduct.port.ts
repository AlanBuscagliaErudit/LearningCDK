import { Product } from "../Domain/Product.service";

export interface ForCreatingProduct {
  createProduct(body: Product): Promise<void>;
}
