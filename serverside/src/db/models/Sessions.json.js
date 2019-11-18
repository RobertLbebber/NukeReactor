import CommonAttributes, { TYPES, createRef } from "./common/Attributes";
import CommonDBCrud from "../oper/CommonDBCrud";
import env from "../../config/env";

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

export default class Sessions {
  constructor() {
    this.primaryKey = "id";
    this.props = {
      ...CommonAttributes,
      fName: { type: TYPES.STRING },
      lName: { type: TYPES.STRING },
      password: { type: TYPES.STRING },
      email: { type: TYPES.STRING },
    };
    this.func = CommonDBCrud(this, this.constructor.name);
  }
  associate(models) {
    this.props.accountId = createRef(models.Account);
  }
}
// Model.props.accountId = { type: new TYPES.REF(Account, Model) };
// console.log(new Sessions().props.accountId);

export const Table = {
  Type: env.mainDB,
  DeletionPolicy: env.deletionPolicy,
  Properties: {
    TableName: env.tableName(Sessions.constructor.name),
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
