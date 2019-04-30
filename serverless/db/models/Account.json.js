/**
 * CreditCards.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
import env from "../../config/env";
import Attributes, { type, required, unique } from "./common/Attributes";

export const Model = {
  primaryKey: "id",
  props: {
    ...Attributes.createdDate,
    ...Attributes.updatedDate,
    ...Attributes.id,
    email: { ...type.STRING, ...required, ...unique },
    password: { ...type.STRING, ...required },
    firstName: { ...type.STRING, ...required },
    middleName: { ...type.STRING, ...required },
    lastName: { ...type.STRING, ...required },

    profile_img: { ...type.STRING },
    pageContent: { collection: "pageTemplates", via: "accountId" },
    messages: { collection: "messages", via: "accountId" },
    creditCard: { collection: "creditCards", via: "accountId" }
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
export default Model;
