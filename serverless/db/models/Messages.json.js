/**
 * Messages.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
import Attributes from "./common/Attributes";
import env from "../../config/env";
import Account from "./Account.json";

export const Model = {
  primaryKey: "id",
  props: {
    ...Attributes.id,
    ...Attributes.createdDate,
    ...Attributes.updatedDate,
    mainMessage: { ...type.STRING },
    extraMessage: { ...type.STRING },
    likes: { ...type.NUMBER },
    shares: { ...type.NUMBER },
    accountId: { ...type.REF(Account) }
  }
};

export const Table = {
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
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  }
};
export default Model;
