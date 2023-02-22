import { randomUUID } from "crypto";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { Product, ProductService } from "./../../Domain/Product.service";
import { ForCreatingProduct } from "./../../Ports/ForCreatingProduct.port";

export class ProductCreator implements ForCreatingProduct {
  constructor(
    private readonly productService: ProductService,
    private readonly dynamoClient: DynamoDB
  ) {}

  async createProduct(body: Product): Promise<void> {
    try {
      await this.dynamoClient.putItem({
        TableName: process.env.TODO_TABLE_NAME as string,
        Item: {
          id: { S: randomUUID() },
          name: { S: body.name },
          price: { S: body.price }
        }
      });
      await this.productService.createProduct(body);
    } catch (err) {
      console.log(err);
    }
  }
}
