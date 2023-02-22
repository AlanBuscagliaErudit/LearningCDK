import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { productGetter } from "../../services/Products/CompositionRoot";

function sendError(message: string): APIGatewayProxyResultV2 {
  return {
    statusCode: 400,
    body: JSON.stringify({ message }),
  };
}

export async function getProduct(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    const { pathParameters } = event;
    console.log("error");
    if (!pathParameters?.id) return sendError("invalid request");
    const id = pathParameters.id;
    const result = await productGetter.getProductById(id);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (err) {
    return sendError("error in getProduct");
  }
}
