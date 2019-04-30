/**
 * CreditCards.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
import env from "../../config/env";
import Attributes, { type } from "./common/Attributes";

export const Model = {
  primaryKey: "id",
  props: {
    ...Attributes.createdDate,
    ...Attributes.updatedDate,
    serial: { ...type.STRING },
    cardNumber: { ...type.NUMBER },
    expMonth: { ...type.NUMBER },
    expYear: { ...type.NUMBER },
    cvv: { ...type.NUMBER },
    accountId: { ...type.STRING }
  }
};

export const Table = {
  Type: env.mainDB,
  DeletionPolicy: "Retain",
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
