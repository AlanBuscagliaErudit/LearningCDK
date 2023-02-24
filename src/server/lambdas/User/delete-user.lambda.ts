import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import { userRemover } from "../../services/Users/CompositionRoot";
import { sendError } from "../../utilities/lamda.utility";

export async function removeUser(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResultV2> {
  try {
    if (!event.body) {
      return sendError("invalid request");
    }

    const newProps = JSON.parse(event.body);
    const result = await userRemover.removeUser(newProps.id);

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (err) {
    return sendError("error in removeUser");
  }
}