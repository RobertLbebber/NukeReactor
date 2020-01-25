import Attributes, { TYPES, createRef } from "./common/Attributes";
import env from "../../config/env";
import SingletonGenerator from "../../endpoints/_common/SingletonGenerator";
import CommonDBCrud from "../oper/CommonDBCrud";
import AccountSingleton from "./Account.json";

const TableName = "Subscription";

class Model {
  constructor() {
    this.pK = "id";
    this.props = {
      ...Attributes,
      serial: { type: TYPES.STRING },
    };
    this.fn = CommonDBCrud(this, TableName);
  }

  init() {
    this.props.subscribeTo = createRef(AccountSingleton.getInstance());
    this.props.accountId = createRef(AccountSingleton.getInstance());
  }
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

const Subscription = new SingletonGenerator(Model);
export default Subscription;
export class SubscriptionDoc extends CommonDoc {
  constructor(identity) {
    super(Model, identity);
  }
}
