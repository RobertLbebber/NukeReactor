import CommonAttributes, { TYPES, createRef } from "./common/Attributes";
import env from "../../config/env";
import SingletonGenerator from "../../endpoints/_common/SingletonGenerator";
import AccountSingleton from "./Account.json";
import CommonModel from "./common/CommonModel.json";

const TableName = "Sessions";

//Active for 2 Hours.hrs mins secs millis
const ACTIVE_TIME = 2 * 60 * 60 * 1000;

export const Utils = {
  stillActive: dataResult => {
    if (dataResult.updatedDate > ACTIVE_TIME) {
      return false;
    }
    return true;
  },
};

class Model extends CommonModel {
  constructor() {
    super(TableName);
    this.props = {
      ...this.props,
      fName: { type: TYPES.STRING },
      lName: { type: TYPES.STRING },
      password: { type: TYPES.STRING },
      email: { type: TYPES.STRING },
    };
  }
  /** @override*/
  init() {
    this.props.accountId = createRef(AccountSingleton.getInstance());
  }
}
// Model.props.accountId = { type: new TYPES.REF(Account, Model) };
// console.log(new Sessions().props.accountId);

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
