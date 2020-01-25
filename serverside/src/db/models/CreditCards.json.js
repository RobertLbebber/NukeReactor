import env from "../../config/env";
import Attributes, { TYPES, createRef } from "./common/Attributes";
import CommonDBCrud from "../oper/CommonDBCrud";
import SingletonGenerator from "../../endpoints/_common/SingletonGenerator";
import AccountSingleton from "./Account.json";

const TableName = "CreditCards";

class Model {
  constructor() {
    this.primaryKey = "id";
    this.props = {
      ...Attributes,
      serial: { type: TYPES.STRING },
      cardNumber: { type: TYPES.NUMBER },
      expMonth: { type: TYPES.NUMBER },
      expYear: { type: TYPES.NUMBER },
      cvv: { type: TYPES.NUMBER },
      /**
       * Connecitions
       * @property {Ref} accountId - Connection Reference to a given account
       */
    };
    this.fn = CommonDBCrud(this, TableName);
  }

  init = () => {
    this.props.accountId = createRef(AccountSingleton.getInstance());
  };
}

export const Table = {
  Type: env.mainDB,
  DeletionPolicy: env.deletionPolicy,
  Properties: {
    TableName: env.tableName(TableName),
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

const CreditCards = new SingletonGenerator(Model);
export default CreditCards;
