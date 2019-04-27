/**
 * CreditCards.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
import env from "../../config/env";
import Attributes from "./common/Attributes";

// module.exports.CreditCards = {
export default {
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
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    AttributeDefinitions: [
      {
        AttributeName: "id",
        AttributeType: "S"
      }
      // Attributes.createdDate,
      // Attributes.updatedDate,
      // {
      //   AttributeName: "serial",
      //   AttributeType: "S"
      // },
      // {
      //   AttributeName: "cardNumber",
      //   AttributeType: "S"
      // },
      // {
      //   AttributeName: "expMonth",
      //   AttributeType: "S"
      // },
      // {
      //   AttributeName: "expYear",
      //   AttributeType: "S"
      // },
      // {
      //   AttributeName: "cvv",
      //   AttributeType: "S"
      // },
      // //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
      // //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
      // //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
      // {
      //   AttributeName: "accountId",
      //   AttributeType: "S"
      // }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
  }
};
