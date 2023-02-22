import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2
} from "aws-lambda/trigger/api-gateway-proxy";
import { productRemover } from "./../../services/Products/CompositionRoot";
import { sendError } from "../../utilities/lamda.utility";

export async function editProduct(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    const { pathParameters } = event;
    if (!pathParameters?.id) return sendError("invalid request");
    const id = pathParameters.id;
    const result = await productRemover.removeProduct(id);

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (err) {
    return sendError("error in getProduct");
  }
}
