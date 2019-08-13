import Attributes, { TYPES } from "./common/Attributes";
import env from "../../config/env";
import Account from "./Account.json";
import CommonDBCrud from "../oper/CommonDBCrud";

let TableName = env.tableName("Subscription");

export const Model = {
  primaryKey: "id",
  props: {
    ...Attributes,
    serial: { type: TYPES.STRING },
    accountId: { type: new TYPES.REF(Account) },
    subscribeTo: { type: new TYPES.REF(Account) }
  }
};
Model.func = CommonDBCrud(Model, TableName);

export const Table = {
  Type: env.mainDB,
  DeletionPolicy: env.deletionPolicy,
  Properties: {
    TableName,
    KeySchema: [
      {
        AttributeName: "id",
        KeyType: "HASH"
      }
    ],
    AttributeDefinitions: [
      {
        AttributeName: "id",
        AttributeType: "S"
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  }
};

export default Model;
