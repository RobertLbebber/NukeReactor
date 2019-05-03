/**
 * Messages.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
import Attributes from "./common/Attributes";
import env from "../../config/env";
import Account from "./Account.json";
import { TYPES } from "./common/Attributes";

export const Model = {
  primaryKey: "id",
  props: {
    ...Attributes.id,
    ...Attributes.createdDate,
    ...Attributes.updatedDate,
    mainMessage: { type: TYPES.STRING },
    extraMessage: { type: TYPES.STRING },
    likes: { type: TYPES.NUMBER },
    shares: { type: TYPES.NUMBER },
    accountId: { type: new TYPES.REF(Account) }
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
  DeletionPolicy: env.deletionPolicy,
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
