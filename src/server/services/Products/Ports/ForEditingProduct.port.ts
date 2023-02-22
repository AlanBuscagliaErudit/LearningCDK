import { Product } from "../Domain/Product.service";

export interface ForEditingProduct {
  editProduct(id: string, body: Product): Promise<Product | null>;
}
