import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { ProductRemover } from "./ProductRemover.adapter";
import { productServiceMock } from "../../Domain/Product.service.mock";

export const dynamoClientMock = {
  deleteItem: jest.fn().mockResolvedValue({ Item: marshall({}) })
} as unknown as DynamoDB;

export const productRemoverMock = new ProductRemover(
  productServiceMock,
  dynamoClientMock
);
