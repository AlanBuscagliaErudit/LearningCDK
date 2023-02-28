import path from "path";
import {
  AuthorizationType,
  IAuthorizer,
  LambdaIntegration,
  RestApi
} from "aws-cdk-lib/aws-apigateway";
import { Role } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
// eslint-disable-next-line import/no-extraneous-dependencies
import { APIGatewayProxyResultV2 } from "aws-lambda/trigger/api-gateway-proxy";

export enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

export interface LambdaForIntegrator {
  key: string;
  this: any;
  entry: string;
  handler?: string;
  environment: { [key: string]: string };
  role: Role;
  method: Methods;
  tablePermissions: "read" | "write" | "readwrite";
  resource: string[];
}

export const LambdaIntegrator = (
  lambdasStructure: LambdaForIntegrator[],
  api: RestApi,
  cognitoUserPoolAuthorizer: IAuthorizer
) => {
  const lambdaGeneratorReducer = (
    acc: Map<string, NodejsFunction>,
    lambda: LambdaForIntegrator
  ) => {
    const newLambda = new NodejsFunction(lambda.this, lambda.key, {
      runtime: Runtime.NODEJS_18_X,
      entry: path.resolve(lambda.entry),
      ...(lambda.handler && { handler: lambda.handler }),
      role: lambda.role,
      environment: lambda.environment
    });

    const getAllResource =
      lambda.resource.length === 1
        ? api.root.addResource(lambda.resource[0])
        : api.root
            .addResource(lambda.resource[0])
            .addResource(lambda.resource[1]);

    getAllResource.addMethod(
      lambda.method,
      new LambdaIntegration(newLambda, {
        integrationResponses: [
          {
            responseParameters: {
              "method.response.header.Access-Control-Allow-Origin": "'*'"
            },
            responseTemplates: {
              "application/json": JSON.stringify({
                message: "$util.parseJson($input.body)",
                state: "ok"
              })
            },
            statusCode: "200"
          }
        ]
      }),
      {
        methodResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Content-Type": true,
              "method.response.header.Access-Control-Allow-Origin": true,
              "method.response.header.Access-Control-Allow-Credentials": true
            }
          }
        ],
        authorizer: cognitoUserPoolAuthorizer,
        authorizationType: AuthorizationType.COGNITO
      }
    );
    return acc.set(lambda.key, newLambda);
  };
  const reducedIntegrations = lambdasStructure.reduce(
    lambdaGeneratorReducer,
    new Map()
  );
  return reducedIntegrations;
};

export function sendError(message: string): APIGatewayProxyResultV2 {
  return {
    statusCode: 400,
    body: JSON.stringify({ message })
  };
}
