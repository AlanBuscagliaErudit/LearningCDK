import { DynamoDB, ScanInput } from "@aws-sdk/client-dynamodb";
import { GenerateDynamoSearchItem, TransformDynamoItem } from "../../../../utilities/dynamo.utility";
import { Product, ProductService } from "../../Domain/Product.service";
import { ForGettingProduct } from "../../Ports/ForGettingProduct.port";

export class ProductGetter implements ForGettingProduct {
  private productTable = process.env.TODO_TABLE_NAME as string;

  constructor(private productService: ProductService, private dynamoClient: DynamoDB) {}
  async getProducts(): Promise<Product[]> {
    const scanProducts: ScanInput = {
      TableName: this.productTable,
    };
    const { Items: dynamoItems } = await this.dynamoClient.scan(scanProducts);
    const result = TransformDynamoItem(dynamoItems);
    return this.productService.getProducts(result as Product[]);
  }
  async getProductById(id: string): Promise<Product> {
    const { Item: dynamoItem } = await this.dynamoClient.getItem(
      GenerateDynamoSearchItem(this.productTable, id)
    );
    const result = TransformDynamoItem(dynamoItem);
    return this.productService.getProductById(result as Product);
  }
}
