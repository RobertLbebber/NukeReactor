import Attributes from "./common/Attributes";
import env from "../../config/env";
import Account from "./Account.json";
import CommonDBCrud from "../oper/CommonDBCrud";
import { TYPES } from "./common/Attributes";

const TableName = env.tableName("Messages");

export const Model = {
  primaryKey: "id",
  props: {
    ...Attributes,
    mainMessage: { type: TYPES.STRING },
    extraMessage: { type: TYPES.STRING },
    likes: { type: TYPES.NUMBER },
    shares: { type: TYPES.NUMBER }
  }
};
Model.props.accountId = { type: new TYPES.REF(Account, Model) };
Model.func = CommonDBCrud(Model, TableName);

export const Table = {
  Type: env.mainDB,
  DeletionPolicy: env.deletionPolicy,
  Properties: {
    TableName,
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
// /**
//  * Increment or Decrement the an action of the message
//  * @param {Boolean} incDec -
//  * @param {String} action -
//  * TODO @-param User ID
//  */
// crementAction: async function(incDec, action = "likes") {
//   this.update({ [action]: incDec ? 1 : -1 });
// },
export default Model;
