/**
 * CreditCards.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
import env from "../../config/env";
import Attributes, { TYPES, required, unique } from "./common/Attributes";
import CommonDBCrud from "../oper/CommonDBCrud";

export const Model = {
  primaryKey: "id",
  props: {
    ...Attributes.createdDate,
    ...Attributes.updatedDate,
    ...Attributes.id,
    email: { type: TYPES.STRING, ...required, ...unique },
    password: { type: TYPES.STRING, ...required },
    firstName: { type: TYPES.STRING, ...required },
    middleName: { type: TYPES.STRING, ...required },
    lastName: { type: TYPES.STRING, ...required },

    profile_img: { type: TYPES.STRING },
    pageContent: { collection: "pageTemplates", via: "accountId" },
    messages: { collection: "messages", via: "accountId" },
    creditCard: { collection: "creditCards", via: "accountId" }
  },
  func: { ...CommonDBCrud }
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
export default Model;
