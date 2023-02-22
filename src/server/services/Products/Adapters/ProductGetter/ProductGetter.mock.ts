import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { ProductGetter } from "./ProductGetter.adapter";
import { Product } from "../../Domain/Product.service";
import { productServiceMock } from "../../Domain/Product.service.mock";

export let productMock: Product = {
  id: "1",
  name: "product",
  price: "100",
};

export const dynamoClientMock = {
  scan: jest.fn().mockResolvedValue({ Items: [marshall(productMock)] }),
  getItem: jest.fn().mockResolvedValue({ Item: marshall(productMock) }),
} as unknown as DynamoDB;

export const productGetterMock = new ProductGetter(productServiceMock, dynamoClientMock);