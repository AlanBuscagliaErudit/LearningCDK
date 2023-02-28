import {
  DeleteItemCommand,
  DynamoDB,
  GetItemCommand,
  PutItemCommand,
  PutItemCommandInput,
  QueryCommand,
  QueryCommandInput,
  QueryOutput,
  ScanCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { TransformDynamoItem } from "../../../utilities/dynamo.utility";

export interface QueryItem {
  KeyConditionExpression: string;
  ExpressionAttributeValues: { [key: string]: any };
  Limit: number;
  ExclusiveStartKey: any;
  LastEvaluatedKey: any;
}

export class StorageService {
  constructor(private dynamoClient: DynamoDB) {}

  async createItem<T>(item: T, dbName: string): Promise<void> {
    const putItemCommandInput: PutItemCommandInput = {
      Item: marshall(item),
      TableName: dbName,
    };
    const putItemCommand = new PutItemCommand(putItemCommandInput);
    await this.dynamoClient.send(putItemCommand);
  }

  async getFromStorage<T>(dbName: string): Promise<T[]> {
    const scanCommand = new ScanCommand({
      TableName: dbName,
    });

    const { Items: dynamoItems } = await this.dynamoClient.send(scanCommand);
    const result = TransformDynamoItem(dynamoItems) as T[];
    return result;
  }

  async queryFromStorage(
    dbName: string,
    query: QueryItem
  ): Promise<QueryOutput> {
    const queryCommandInput: QueryCommandInput = {
      TableName: dbName,
      KeyConditionExpression: query.KeyConditionExpression,
      ExpressionAttributeValues: marshall(query.ExpressionAttributeValues),
      Limit: query.Limit,
      ExclusiveStartKey: query.LastEvaluatedKey,
    };

    const queryCommand = new QueryCommand(queryCommandInput);
    const result = await this.dynamoClient.send(queryCommand);
    return result;
  }

  async getItemFromStorageById<T>(id: string, dbName: string): Promise<T> {
    const generatedItem = {
      Key: marshall({ id }),
      TableName: dbName,
    };
    const getItemCommand = new GetItemCommand(generatedItem);
    const { Item: dynamoItem } = await this.dynamoClient.send(getItemCommand);
    const result = TransformDynamoItem(dynamoItem) as T;
    return result;
  }

  async deleteItemFromStorageById(id: string, dbName: string): Promise<void> {
    const deleteCommand = new DeleteItemCommand({
      Key: marshall({ id }),
      TableName: dbName,
    });

    await this.dynamoClient.send(deleteCommand);
  }

  async updateItemFromStorageById(item: any, dbName: string): Promise<void> {
    console.log(item);
    const updateItemCommand = new UpdateItemCommand({
      TableName: dbName,
      Key: marshall({ id: item.account_id }),
      ExpressionAttributeValues: marshall(item),
    });

    await this.dynamoClient.send(updateItemCommand);
  }

  async removeItemFromStorageById(id: string, dbName: string): Promise<void> {
    const deleteCommand = new DeleteItemCommand({
      Key: marshall({ id }),
      TableName: dbName,
    });

    await this.dynamoClient.send(deleteCommand);
  }
}
