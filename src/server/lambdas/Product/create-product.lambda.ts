import { DynamoDB, PutItemInput } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda/trigger/api-gateway-proxy";
import { v4 as uuid } from "uuid";

interface ProductBody {
  name: string;
  price: number;
}

interface Product extends ProductBody {
  id: string;
}

export async function createProduct(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  const { body } = event;
  const tableName = process.env.TODO_TABLE_NAME;

  if (!body) {
    return sendFail("invalid request");
  }

  const dynamoClient = new DynamoDB({
    region: "us-east-1",
  });

  const formattedBody: Product = {
    id: uuid(), ...JSON.parse(body)
  };

  const todoParams: PutItemInput = {
    Item: marshall(formattedBody),
    TableName: tableName,
  };

  try {
    await dynamoClient.putItem(todoParams);

    return {
      statusCode: 200,
      body: JSON.stringify({ formattedBody }),
    };

  } catch (err) {
    console.log(err);
    return sendFail("something went wrong");
  }
}

function sendFail(message: string): APIGatewayProxyResultV2 {
  return {
    statusCode: 400,
    body: JSON.stringify({ message }),
  };
}