import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { StorageService } from "./Storage.service";
import { userMock } from "../../Users/Domain/Users.service.mock";

const marshalledUserMock = marshall(JSON.stringify(userMock), {
  removeUndefinedValues: true
});

export const dynamoClientMock = {
  putItem: jest.fn().mockResolvedValue({ Item: marshalledUserMock }),
  scan: jest.fn().mockResolvedValue({ Items: [marshalledUserMock] }),
  getItem: jest.fn().mockResolvedValue({ Item: marshalledUserMock }),
  deleteItem: jest.fn().mockResolvedValue({ Item: { marshalledUserMock } }),
  updateItem: jest.fn().mockResolvedValue({ Item: marshalledUserMock })
} as unknown as DynamoDB;

export const storageServiceMock = new StorageService(dynamoClientMock);
