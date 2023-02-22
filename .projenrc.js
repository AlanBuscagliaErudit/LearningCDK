const { awscdk } = require("projen");
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: "2.1.0",
  defaultReleaseBranch: "main",
  name: "awstest",
  deps: [
    "deployable-awscdk-app-ts",
    "uuid",
    "@aws-cdk/aws-lambda",
    "@aws-cdk/aws-lambda-nodejs",
    "@aws-sdk/client-dynamodb",
    "@aws-sdk/util-dynamodb",
    "@aws-cdk/aws-iam",
    "@trpc/client",
    "@trpc/server",
    "zod",
  ],
  devDeps: ["@types/uuid", "@types/aws-lambda", "eslint-config-prettier"],
  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.eslint?.addOverride({
  extends: ["prettier"],
  rules: {
    "comma-dangle": "off",
    quotes: [2, "double", { avoidEscape: true }],
  },
  files: ["*"],
});
project.synth();
