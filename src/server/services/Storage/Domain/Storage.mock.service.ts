import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { StorageService } from "./Storage.service";

export const userMock = {
  account_id: "test",
  company: "test",
  email: "test",
  name: "test",
  userManagerLicenses: 1,
};

export const dynamoClientMock = {
  send: jest.fn().mockResolvedValue(marshall(userMock)),
} as unknown as DynamoDB;

export const storageServiceMock = new StorageService(dynamoClientMock);
