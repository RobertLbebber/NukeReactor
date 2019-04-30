/**
 * CreditCards.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
import Attributes from "./common/Attributes";
import env from "../../config/env";

export const Model= {
  ...Attributes.id,
  ...Attributes.createdDate,
  ...Attributes.updatedDate,
}
export const Table= {
  Type: env.mainDB,
  DeletionPolicy: "Retain",
  Properties: {
    AttributeDefinitions: [
      {
        AttributeName: "id",
        AttributeType: "S"
      }
      /
    ],
    KeySchema: [
      {
        AttributeName: "id",
        KeyType: "HASH"
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    },
    TableName: env.tableName("TodoTable")
  }
};
export default Model;
