import { Product } from "../Domain/Product.service";

export interface ForEditingProduct {
  editProduct(body: Product): Promise<void>;
}
