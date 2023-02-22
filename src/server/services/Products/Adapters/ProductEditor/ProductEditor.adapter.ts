import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import {
  GenerateDynamoSearchItem,
  TransformDynamoItem
} from "../../../../utilities/dynamo.utility";
import { Product, ProductService } from "../../Domain/Product.service";
import { ForEditingProduct } from "../../Ports/ForEditingProduct.port";

export class ProductEditor implements ForEditingProduct {
  private productTable = process.env.TODO_TABLE_NAME as string;

  constructor(
    private productService: ProductService,
    private dynamoClient: DynamoDB
  ) {}

  async editProduct(id: string, body: Product): Promise<Product | null> {
    const { Item: dynamoItem } = await this.dynamoClient.getItem(
      GenerateDynamoSearchItem(this.productTable, id)
    );
    const result = TransformDynamoItem(dynamoItem);
    const newItem = await this.productService.editProduct(
      result as Product,
      body
    );

    try {
      await this.dynamoClient.putItem({
        Item: marshall(JSON.stringify(newItem)),
        TableName: this.productTable
      });

      return await this.productService.editProduct(result as Product, body);
    } catch (err) {
      console.log(err);
      
      return null;
    }
  }
}
