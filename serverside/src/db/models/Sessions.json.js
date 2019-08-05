import Attributes, { TYPES } from "./common/Attributes";
import CommonDBCrud from "../oper/CommonDBCrud";
import env from "../../config/env";
import Account from "./Account.json";

let tableName = env.tableName("Sessions");

//Active for 2 Hours.hrs mins secs millis
const ACTIVE_TIME = 2 * 60 * 60 * 1000;

export const Utils = {
  stillActive: dataResult => {
    if (dataResult.updatedDate > ACTIVE_TIME) {
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
  func: CommonDBCrud(tableName)
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
