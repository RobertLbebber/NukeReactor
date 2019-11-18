import Attributes, { TYPES, createRef } from "./common/Attributes";
import env from "../../config/env";
import CommonDBCrud from "../oper/CommonDBCrud";

export default class Subscription {
  constructor() {
    this.primaryKey = "id";
    this.props = {
      ...Attributes,
      serial: { type: TYPES.STRING },
    };
    this.func = CommonDBCrud(this, this.constructor.name);
  }

  associate(models) {
    this.props.subscribeTo = createRef(models.Account);
    this.props.accountId = createRef(models.Account);
  }
}

export const Table = {
  Type: env.mainDB,
  DeletionPolicy: env.deletionPolicy,
  Properties: {
    TableName: env.tableName(Subscription.constructor.name),
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
