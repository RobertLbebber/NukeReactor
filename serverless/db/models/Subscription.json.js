/**
 * Subscription.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
import Attributes, {type} from "./common/Attributes";
import env from "../../config/env";
import Account from "./Account.json";

export const Model = {
  primaryKey:"id",
  props: {
    ...Attributes.id,
    ...Attributes.createdDate,
    ...Attributes.updatedDate,
    serial: {type.STRING},
    accountId: {type.REF(Account)},
    subscribeTo: {type.REF(Account)}
  }
};
export const Table = {
  Type: env.mainDB,
  DeletionPolicy: "Retain",
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