import { App, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import {
  RestApi,
  CognitoUserPoolsAuthorizer,
} from "aws-cdk-lib/aws-apigateway";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { ManagedPolicy, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import { CognitoPool } from "./cognito";
import {
  LambdaForIntegrator,
  LambdaIntegrator,
  Methods,
} from "./server/utilities/lamda.utility";

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    // Cognito Pool
    new CognitoPool(this, "MyCognitoPool", {
      stage: "Beta",
    });

    // Lambda Role
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

    const tableName = "ProductsTable";
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
        key: "getUsers",
        this: this,
        entry: "src/server/server.ts",
        environment: {
          TODO_TABLE_NAME: tableName,
        },
        role: lambdaRole,
        method: Methods.GET,
        tablePermissions: "read",
        resource: ["getUsers"],
      },
      {
        key: "getUser",
        this: this,
        entry: "src/server/server.ts",
        environment: {
          TODO_TABLE_NAME: tableName,
        },
        role: lambdaRole,
        method: Methods.GET,
        tablePermissions: "read",
        resource: ["getUser", "{id}"],
      },
      {
        key: "createUser",
        this: this,
        entry: "src/server/server.ts",
        environment: {
          TODO_TABLE_NAME: tableName,
        },
        role: lambdaRole,
        method: Methods.POST,
        tablePermissions: "write",
        resource: ["createUser"],
      },
      {
        key: "editUser",
        this: this,
        entry: "src/server/server.ts",
        environment: {
          TODO_TABLE_NAME: tableName,
        },
        role: lambdaRole,
        method: Methods.PUT,
        tablePermissions: "write",
        resource: ["editUser", "{id}"],
      },
      {
        key: "removeUser",
        this: this,
        entry: "src/server/server.ts",
        environment: {
          TODO_TABLE_NAME: tableName,
        },
        role: lambdaRole,
        method: Methods.DELETE,
        tablePermissions: "write",
        resource: ["removeUser", "{id}"],
      },
    ];

    const api = new RestApi(this, "ApiGateway", {});

    const userPoolsAuthorizer = new CognitoUserPoolsAuthorizer(
      this,
      "cognito-userpool-authorizer",
      {
        cognitoUserPools: [CognitoPool.userPool],
      }
    );

    const integratedLambdasMap = LambdaIntegrator(
      Lambdas,
      api,
      userPoolsAuthorizer
    );
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

const app = new App();
new MyStack(app, "awstest-dev", { env: devEnv });
// new MyStack(app, 'awstest-prod', { env: prodEnv });

app.synth();
