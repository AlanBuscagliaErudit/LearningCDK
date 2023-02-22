import { APIGatewayProxyEvent } from "aws-lambda";
import { APIGatewayProxyResultV2 } from "aws-lambda/trigger/api-gateway-proxy";
import { productRemover } from "./../../services/Products/CompositionRoot";
import { sendError } from "../../utilities/lamda.utility";

export async function removeProduct(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResultV2> {
  try {
    if (!event.body) {
      return sendError("invalid request");
    }

    const newProps = JSON.parse(event.body);
    const result = await productRemover.removeProduct(newProps.id);

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (err) {
    return sendError("error in getProduct");
  }
}