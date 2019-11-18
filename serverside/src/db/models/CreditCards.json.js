import env from "../../config/env";
import Attributes, { TYPES, createRef } from "./common/Attributes";
import CommonDBCrud from "../oper/CommonDBCrud";
import Account from "./Account.json";

export default class CreditCards {
  constructor(models) {
    this.primaryKey = "id";
    this.props = {
      ...Attributes,
      serial: { type: TYPES.STRING },
      cardNumber: { type: TYPES.NUMBER },
      expMonth: { type: TYPES.NUMBER },
      expYear: { type: TYPES.NUMBER },
      cvv: { type: TYPES.NUMBER },
    };
    this.func = CommonDBCrud(this, this.constructor.name);
  }

  static init = models => {
    this.props.accountId = createRef(models.Account);
  };
}

export const Table = {
  Type: env.mainDB,
  DeletionPolicy: env.deletionPolicy,
  Properties: {
    TableName: env.tableName(CreditCards.constructor.name),
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
