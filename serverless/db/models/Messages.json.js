/**
 * Messages.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
import Attributes from "./common/Attributes";
import env from "../../config/env";

export default {
  // /**
  //  * Increment or Decrement the an action of the message
  //  * @param {Boolean} incDec -
  //  * @param {String} action -
  //  * TODO @-param User ID
  //  */
  // crementAction: async function(incDec, action = "likes") {
  //   this.update({ [action]: incDec ? 1 : -1 });
  // },
  Type: env.mainDB,
  DeletionPolicy: "Retain",
  Properties: {
    TableName: env.tableName("Messages"),
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
      // Attributes.createdDate,
      // Attributes.updatedDate,
      // {
      //   AttributeName: "other",
      //   KeyType: "HASH"
      // },
      // {
      //   AttributeName: "mainMessage",
      //   AttributeType: "S"
      // },
      // {
      //   AttributeName: "extraMessage",
      //   AttributeType: "S"
      // },
      // {
      //   AttributeName: "likes",
      //   AttributeType: "N"
      // },
      // {
      //   AttributeName: "shares",
      //   AttributeType: "N"
      // },
      // {
      //   AttributeName: "accountId",
      //   AttributeType: "account"
      // }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  }
};
