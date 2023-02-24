
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { userCreator } from "../../services/Users/CompositionRoot";
import { sendError } from "../../utilities/lamda.utility";

export async function createUser(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    const { body } = event;
    if (!body) {
      return sendError("invalid request");
    }
    const result = await userCreator.createUser(JSON.parse(body));

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (err) {
    return sendError("error in createUser");
  }
}
