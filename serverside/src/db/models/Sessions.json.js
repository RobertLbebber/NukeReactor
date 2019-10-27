import CommonAttributes, { TYPES } from "./common/Attributes";
import CommonDBCrud from "../oper/CommonDBCrud";
import env from "../../config/env";
import Account from "./Account.json";

let TableName = env.tableName("Sessions");

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
    ...CommonAttributes,
    fName: { type: TYPES.STRING },
    lName: { type: TYPES.STRING },
    password: { type: TYPES.STRING },
    email: { type: TYPES.STRING }
  }
};
Model.props.accountId = { type: new TYPES.REF(Account, Model) };
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
