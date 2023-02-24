import { APIGatewayProxyResultV2, APIGatewayProxyEventV2 } from "aws-lambda";
import { userGetter } from "../../services/Users/CompositionRoot";

function sendError(message: string): APIGatewayProxyResultV2 {
  return {
    statusCode: 400,
    body: JSON.stringify({ message }),
  };
}

export async function getUsers(
  _event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    const result = await userGetter.getUsers();
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (err) {
    return sendError("error in getUsers");
  }
}
