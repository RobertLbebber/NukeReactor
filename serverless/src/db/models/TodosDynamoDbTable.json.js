import Attributes from "./common/Attributes";
import env from "../../config/env";
import CommonDBCrud from "../oper/CommonDBCrud";

const tableName = env.tableName("TodoTable");

export const Model = {
  primaryKey: "id",
  props: {
    ...Attributes.id,
    ...Attributes.createdDate,
    ...Attributes.updatedDate
  },
  func: { ...CommonDBCrud(tableName) }
};
export const Table = {
  Type: env.mainDB,
  DeletionPolicy: env.deletionPolicy,
  Properties: {
    AttributeDefinitions: [
      {
        AttributeName: "id",
        AttributeType: "S"
      }
    ],
    KeySchema: [
      {
        AttributeName: "id",
        KeyType: "HASH"
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    },
    TableName: tableName
  }
};
export default Model;
