import Attributes, { createRef, required, unique } from "./common/Attributes";
import env from "../../config/env";
import CommonDBCrud from "../oper/CommonDBCrud";
import { TYPES } from "./common/Attributes";

export default class Messages {
  constructor() {
    this.primaryKey = "id";
    this.props = {
      ...Attributes,
      mainMessage: { type: TYPES.STRING },
      extraMessage: { type: TYPES.STRING },
      likes: { type: TYPES.NUMBER },
      shares: { type: TYPES.NUMBER },
    };
    this.func = CommonDBCrud(this, this.constructor.name);
  }
  associate(models) {
    this.props.accountID = createRef(models.Account, { ...required, ...unique });
  }
}

export const Table = {
  Type: env.mainDB,
  DeletionPolicy: env.deletionPolicy,
  Properties: {
    TableName: env.tableName(Messages.constructor.name),
    KeySchema: [
      {
        AttributeName: "id",
        KeyType: "HASH",
      },
    ],
    AttributeDefinitions: [
      {
        AttributeName: "id",
        AttributeType: "S",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  },
};
// /**
//  * Increment or Decrement the an action of the message
//  * @param {Boolean} incDec -
//  * @param {String} action -
//  * TODO @-param User ID
//  */
// crementAction: async function(incDec, action = "likes") {
//   this.update({ [action]: incDec ? 1 : -1 });
// },
