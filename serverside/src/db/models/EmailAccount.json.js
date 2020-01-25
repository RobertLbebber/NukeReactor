import _ from "lodash";
import env from "../../config/env";
import { TYPES, required, unique, createSoftRef } from "./common/Attributes";
import AccountSingleton from "./Account.json";
import SingletonGenerator from "../../endpoints/_common/SingletonGenerator";
import CommonModel from "./common/CommonModel.json";

const TableName = "EmailAccount";

class Model extends CommonModel {
  constructor() {
    super(TableName);
    this.primaryKey = "email";
    this.props = _.omit(this.props, "id");
    this.props = {
      ...this.props,
      email: { type: TYPES.STRING, required, unique },
      /**
       * Connections
       * @property {SoftRef} accountId-
       */
    };
  }

  init() {
    this.props.accountID = createSoftRef(AccountSingleton.getInstance(), { unique });
  }
}

export const Table = {
  Type: env.mainDB,
  DeletionPolicy: env.deletionPolicy,
  Properties: {
    TableName: env.tableName(TableName),
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

const EmailAccountSingleton = new SingletonGenerator(Model);
export default EmailAccountSingleton;
