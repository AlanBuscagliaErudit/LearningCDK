import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { Logger } from "./Adapters/Logger/Logger.adapter";
import { ProductGetter } from "./Adapters/ProductGetter/ProductGetter.adapter";
import { ProductService } from "./Domain/Product.service";

const dynamoClient = new DynamoDB({
  region: process.env.AWS_REGION 
});

const logger = new Logger();
const productService = new ProductService(logger);
export const productGetter = new ProductGetter(productService, dynamoClient);
