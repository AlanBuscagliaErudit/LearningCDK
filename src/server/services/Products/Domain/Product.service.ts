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
}
