/**
 * CreditCards.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
import env from "../../config/env";
import Attributes, { TYPES } from "./common/Attributes";
import Account from "./Account.json";

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
  }
};

export const Table = {
  Type: env.mainDB,
  DeletionPolicy: env.deletionPolicy,
  Properties: {
    TableName: env.tableName("CreditCards"),
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
