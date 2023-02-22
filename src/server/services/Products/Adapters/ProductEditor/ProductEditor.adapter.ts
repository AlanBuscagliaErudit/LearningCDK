import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { Product, ProductService } from "../../Domain/Product.service";
import { ForEditingProduct } from "../../Ports/ForEditingProduct.port";

export class ProductEditor implements ForEditingProduct {
  constructor(
    private productService: ProductService,
    private dynamoClient: DynamoDB
  ) {}

  async editProduct(body: Product): Promise<void> {
    const { id } = body;

    try {
      await this.dynamoClient.updateItem({
        TableName: process.env.TODO_TABLE_NAME as string,
        Key: marshall({ id }),
        ExpressionAttributeNames: {
          "#name": body.name,
          "#price": body.price
        }
      });

      await this.productService.editProduct(body);
    } catch (err) {
      console.log(err);
    }
  }
}
