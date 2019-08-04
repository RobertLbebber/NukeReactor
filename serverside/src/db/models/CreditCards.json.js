import env from "../../config/env";
import Attributes, { TYPES } from "./common/Attributes";
import CommonDBCrud from "../oper/CommonDBCrud";
import Account from "./Account.json";

const tableName = env.tableName("CreditCards");

export const Model = {
  primaryKey: "id",
  props: {
    ...Attributes.createdDate,
    ...Attributes.updatedDate,
    serial: { type: TYPES.STRING },
    cardNumber: { type: TYPES.NUMBER },
    expMonth: { type: TYPES.NUMBER },
    expYear: { type: TYPES.NUMBER },
    cvv: { type: TYPES.NUMBER },
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
