import { DynamoDB, PutItemInput, ScanInput } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import {
  GenerateDynamoSearchItem,
  TransformDynamoItem,
} from "../../../utilities/dynamo.utility";

export class StorageService {
  constructor(private dynamoClient: DynamoDB) {}

  async store(data: any, dbName: string): Promise<void> {
    try {
      const DynamoSearchItem: PutItemInput = {
        Item: data,
        TableName: dbName,
      };
      await this.dynamoClient.putItem(DynamoSearchItem);
    } catch (error) {
      console.log(error);
    }
  }

  async createItem<T>(item: T, dbName: string): Promise<void> {
    try {
      const DynamoSearchItem: PutItemInput = {
        Item: marshall(item),
        TableName: dbName,
      };
      await this.dynamoClient.putItem(DynamoSearchItem);
    } catch (error) {
      console.log(error);
    }
  }

  async getFromStorage<T>(dbName: string): Promise<T[]> {
    const scanItems: ScanInput = {
      TableName: dbName,
    };
    const { Items: dynamoItems } = await this.dynamoClient.scan(scanItems);
    const result = TransformDynamoItem(dynamoItems) as T[];
    return result;
  }

  async getItemFromStorageById<T>(id: string, dbName: string): Promise<T> {
    const { Item: dynamoItem } = await this.dynamoClient.getItem(
      GenerateDynamoSearchItem(dbName, id)
    );
    const result = TransformDynamoItem(dynamoItem) as T;
    return result;
  }

  async deleteItemFromStorageById(id: string, dbName: string): Promise<void> {
    await this.dynamoClient.deleteItem(GenerateDynamoSearchItem(dbName, id));
  }

  async updateItemFromStorageById(item: any, dbName: string): Promise<void> {
    await this.dynamoClient.updateItem({
      TableName: dbName,
      Key: { id: { S: item.id } },
      ExpressionAttributeNames: {
        "#name": item.name,
        "#price": item.price,
      },
    });
  }

  async removeItemFromStorageById(id: string, dbName: string): Promise<void> {
    await this.dynamoClient.deleteItem(GenerateDynamoSearchItem(dbName, id));
  }
}
