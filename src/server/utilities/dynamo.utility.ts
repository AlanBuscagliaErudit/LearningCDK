import { AttributeValue } from "@aws-sdk/client-dynamodb/dist-types/models/models_0";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

export const GenerateDynamoSearchItem = (dbName: string, key: string) => {
  return {
    Key: marshall({
      id: key
    }),
    TableName: dbName
  };
};

export const TransformDynamoItem = (
  item:
    | Record<string, AttributeValue>
    | Record<string, AttributeValue>[]
    | undefined
) => {
  if (Array.isArray(item)) {
    return item.map((i) => unmarshall(i));
  }
  return item ? unmarshall(item) : null;
};

export const RecordGenerator = (item: { [key: string]: any }) => {
  const recordReducer = (acc: any, key: string) => {
    return { ...acc, [key]: { S: item[key] } };
  };
  return Object.keys(item).reduce(recordReducer, {});
};
