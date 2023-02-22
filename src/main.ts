import { App, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { RestApi } from "aws-cdk-lib/aws-apigateway";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { ManagedPolicy, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import {
  LambdaForIntegrator,
  LambdaIntegrator,
  Methods,
} from "./server/utilities/lamda.utility";

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);
    const tableName = "ProductsTable";

    const lambdaRole = new Role(this, "LambdaRole", {
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaBasicExecutionRole"
        ),
        ManagedPolicy.fromAwsManagedPolicyName("AmazonDynamoDBFullAccess"),
        ManagedPolicy.fromAwsManagedPolicyName("CloudWatchFullAccess"),
      ],
    });

    const table = new dynamodb.Table(this, tableName, {
      tableName,
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PROVISIONED,
      readCapacity: 5,
      writeCapacity: 5,
      removalPolicy: RemovalPolicy.DESTROY,
      pointInTimeRecovery: true,
      tableClass: dynamodb.TableClass.STANDARD_INFREQUENT_ACCESS,
    });

    const Lambdas: LambdaForIntegrator[] = [
      {
        key: "getProducts",
        this: this,
        entry: "src/server/server.ts",
        environment: {
          TODO_TABLE_NAME: tableName,
        },
        role: lambdaRole,
        method: Methods.GET,
        tablePermissions: "read",
        resource: ["getProducts"],
      },
      {
        key: "getProduct",
        this: this,
        entry: "src/server/server.ts",
        environment: {
          TODO_TABLE_NAME: tableName,
        },
        role: lambdaRole,
        method: Methods.GET,
        tablePermissions: "read",
        resource: ["getProduct", "{id}"],
      },
      {
        key: "createProduct",
        this: this,
        entry: "src/server/server.ts",
        environment: {
          TODO_TABLE_NAME: tableName,
        },
        role: lambdaRole,
        method: Methods.POST,
        tablePermissions: "write",
        resource: ["createProduct"],
      },
    ];
    const api = new RestApi(this, "ApiGateway", {});
    const integratedLambdasMap = LambdaIntegrator(Lambdas, api);
    Lambdas.forEach((lambda) => {
      const newLambda = integratedLambdasMap.get(lambda.key);
      if (newLambda) {
        if (lambda.tablePermissions === "read") {
          table.grantReadData(newLambda);
        } else if (lambda.tablePermissions === "write") {
          table.grantWriteData(newLambda);
        } else {
          table.grantReadWriteData(newLambda);
        }
      }
    });
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, "awstest-dev", { env: devEnv });
// new MyStack(app, 'awstest-prod', { env: prodEnv });

app.synth();
