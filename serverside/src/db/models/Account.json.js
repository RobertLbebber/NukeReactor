import env from "../../config/env";
import CommonAttributes, { TYPES, required, unique } from "./common/Attributes";
import CommonDBCrud from "../oper/CommonDBCrud";

const TableName = env.tableName("Account");

export const Model = {
  primaryKey: "id",
  props: {
    ...CommonAttributes,
    email: { type: TYPES.STRING, ...required, ...unique },
    password: { type: TYPES.STRING, ...required },
    firstName: { type: TYPES.STRING, ...required },
    middleName: { type: TYPES.STRING, ...required },
    lastName: { type: TYPES.STRING, ...required },

    profile_img: { type: TYPES.STRING },
    pageContent: { collection: "pageTemplates", via: "accountId" },
    messages: { collection: "messages", via: "accountId" },
    creditCard: { collection: "creditCards", via: "accountId" }
  }
};
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
