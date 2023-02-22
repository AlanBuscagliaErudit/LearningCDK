import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { GenerateDynamoSearchItem } from "../../../../utilities/dynamo.utility";
import { ProductService } from "../../Domain/Product.service";
import { ForRemovingProduct } from "../../Ports/ForRemovingProduct.port";

export class ProductRemover implements ForRemovingProduct {
  private productTable = process.env.TODO_TABLE_NAME as string;
  constructor(
    private readonly productService: ProductService,
    private readonly dynamoClient: DynamoDB
  ) {}

  async removeProduct(id: string): Promise<void> {
    const params = GenerateDynamoSearchItem(this.productTable, id);
    await this.dynamoClient.deleteItem(params)

    return this.productService.removeProduct(id);
  }
}