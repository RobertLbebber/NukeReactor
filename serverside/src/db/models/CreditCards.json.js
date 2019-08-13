import env from "../../config/env";
import Attributes, { TYPES } from "./common/Attributes";
import CommonDBCrud from "../oper/CommonDBCrud";
import Account from "./Account.json";

const TableName = env.tableName("CreditCards");

export const Model = {
  primaryKey: "id",
  props: {
    ...Attributes,
    serial: { type: TYPES.STRING },
    cardNumber: { type: TYPES.NUMBER },
    expMonth: { type: TYPES.NUMBER },
    expYear: { type: TYPES.NUMBER },
    cvv: { type: TYPES.NUMBER }
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

export default Model;
