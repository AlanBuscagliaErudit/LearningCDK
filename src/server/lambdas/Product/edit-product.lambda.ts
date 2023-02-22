import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2
} from "aws-lambda/trigger/api-gateway-proxy";
import { productEditor } from "./../../services/Products/CompositionRoot";
import { sendError } from "../../utilities/lamda.utility";

export async function editProduct(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    const { body } = event;
    if (!body) {
      return sendError("invalid request");
    }
    const result = await productEditor.editProduct(JSON.parse(body));

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (err) {
    return sendError("error in editProduct");
  }
}
