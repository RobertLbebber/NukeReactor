import Attributes, { TYPES } from "./common/Attributes";
import CommonDBCrud from "../oper/CommonDBCrud";
import env from "../../config/env";
import Account from "./Account.json";

let tableName = env.tableName("Sessions");

export const Utils = {
  stillActive: dataResult => {
    //          hrs mins secs millis
    activeSpan = 2 * 60 * 60 * 1000;
    if (dataResult.updatedDate > activeSpan) {
      return false;
    }
    return true;
  }
};

export const Model = {
  primaryKey: "id",
  props: {
    ...Attributes.id,
    ...Attributes.createdDate,
    ...Attributes.updatedDate,
    accountId: { type: new TYPES.REF(Account) }
  },
  func: { ...CommonDBCrud(tableName) }
};

export const Table = {
  Type: env.mainDB,
  DeletionPolicy: env.deletionPolicy,
  Properties: {
    TableName: tableName,
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
