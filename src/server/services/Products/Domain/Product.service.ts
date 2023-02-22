import { ForLogging } from "../Ports/ForLogging.port";

export interface Product {
  id: string;
  name: string;
  price: string;
}

export class ProductService {
  constructor(private logger: ForLogging) {}

  async getProducts(products: Product[]): Promise<Product[]> {
    this.logger.log("getProducts");
    
    return products;
  }

  async getProductById(product: Product): Promise<Product> {
    this.logger.log("getProductById");

    return product;
  }

  async editProduct(_body: Product): Promise<void> {
    this.logger.log("editProduct");
  }

  async removeProduct(id: string): Promise<void> {
    this.logger.log("removeProduct id: " + id);
  }

  async createProduct(_body: Product): Promise<void> {
    this.logger.log("createProduct");
  }
}
