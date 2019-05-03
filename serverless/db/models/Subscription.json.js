/**
 * Subscription.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
import Attributes, { TYPES } from "./common/Attributes";
import env from "../../config/env";
import Account from "./Account.json";
import CommonDBCrud from "../oper/CommonDBCrud";

export const Model = {
  primaryKey: "id",
  props: {
    ...Attributes.id,
    ...Attributes.createdDate,
    ...Attributes.updatedDate,
    serial: { type: TYPES.STRING },
    accountId: { type: new TYPES.REF(Account) },
    subscribeTo: { type: new TYPES.REF(Account) }
  },
  func: { ...CommonDBCrud }
};
export const Table = {
  Type: env.mainDB,
  DeletionPolicy: env.deletionPolicy,
  Properties: {
    TableName: env.tableName("Subscription"),
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
