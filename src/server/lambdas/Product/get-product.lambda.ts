import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { productGetter } from "../../services/Products/CompositionRoot";
import { sendError } from "../../utilities/lamda.utility";

export async function getProduct(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    const { pathParameters } = event;
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
