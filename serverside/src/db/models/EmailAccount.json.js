import env from "../../config/env";
import { TYPES, required, unique, createSoftRef } from "./common/Attributes";
import CommonDBCrud from "../oper/CommonDBCrud";
import { Account } from "./Account.json";

export default class EmailAccount {
  constructor() {
    this.primaryKey = "email";

    this.modalName = this.constructor.name;
    this.props = {
      email: { type: TYPES.STRING, ...required, ...unique },
    };
    this.func = CommonDBCrud(this, this.constructor.name);
  }
  associate(models) {
    this.props.accountID = createSoftRef(models.Account, { ...required, ...unique });
  }
}

export const Table = {
  Type: env.mainDB,
  DeletionPolicy: env.deletionPolicy,
  Properties: {
    TableName: env.tableName(EmailAccount.constructor.name),
    KeySchema: [
      {
        AttributeName: "email",
        KeyType: "HASH",
      },
    ],
    AttributeDefinitions: [
      {
        AttributeName: "email",
        AttributeType: "S",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  },
};
