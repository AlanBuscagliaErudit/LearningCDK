import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { ProductEditor } from "./ProductEditor.adapter";
import { Product } from "../../Domain/Product.service";
import { productServiceMock } from "../../Domain/Product.service.mock";

export let productMock: Product = {
  id: "1",
  name: "product",
  price: "100",
};

export const dynamoClientMock = {
  putItem: jest.fn().mockResolvedValue({ Item: marshall(productMock) }),
} as unknown as DynamoDB;

export const productEditorMock = new ProductEditor(productServiceMock, dynamoClientMock);