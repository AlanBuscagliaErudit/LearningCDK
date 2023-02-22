import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { productGetter } from "../../services/Products/CompositionRoot";

function sendError(message: string): APIGatewayProxyResultV2 {
  return {
    statusCode: 400,
    body: JSON.stringify({ message }),
  };
}

export async function getProducts(
  _event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    const result = await productGetter.getProducts();
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (err) {
    return sendError("error in getProduct");
  }
}
