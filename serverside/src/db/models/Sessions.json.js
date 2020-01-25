import Moment from "moment";

import CommonAttributes, { TYPES, createRef } from "./common/Attributes";
import env from "../../config/env";
import SingletonGenerator from "../../endpoints/_common/SingletonGenerator";
import AccountSingleton from "./Account.json";
import CommonModel from "./common/CommonModel.json";
import EmailAccountSingleton from "./EmailAccount.json";

const TableName = "Sessions";

export const Utils = {
  stillActive: dataResult => {
    let then = new Moment(dataResult.updatedDate);
    console.log(then.isBetween(new Moment().subtract(10, "minute").format(), new Moment().add(10, "minute").format()));
    console.log(then.format());
    console.log(new Moment().subtract(10, "minute").format());
    console.log(new Moment().add(10, "minute").format());
    return then.isBetween(new Moment().subtract(10, "minute"), new Moment().add(10, "minute"));
  },
};

class Model extends CommonModel {
  constructor() {
    super(TableName);
    /**
     * Primary Key is "id"
     */
  }
  /** @override*/
  init() {
    this.props.accountId = createRef(AccountSingleton.getInstance());
    this.props.emailAccountId = createRef(EmailAccountSingleton.getInstance());
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

const SessionsSingleton = new SingletonGenerator(Model);
export default SessionsSingleton;
