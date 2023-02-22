import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2
} from "aws-lambda/trigger/api-gateway-proxy";
import { productCreator } from "../../services/Products/CompositionRoot";
import { sendError } from "../../utilities/lamda.utility";

export async function createProduct(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    const { body } = event;
    if (!body) {
      return sendError("invalid request");
    }
    const result = await productCreator.createProduct(JSON.parse(body));

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (err) {
    return sendError("error in createProduct");
  }
}
