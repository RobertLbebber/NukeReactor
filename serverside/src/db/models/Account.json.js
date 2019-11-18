import env from "../../config/env";
import CommonAttributes, { TYPES, required, unique, createRef, createCollection } from "./common/Attributes";
import CommonDBCrud from "../oper/CommonDBCrud";
import EmailAccount from "./EmailAccount.json";

export const AccountGn = (firstName, lastName, email, password) => ({
  firstName,
  email,
  password,
  lastName,
});

/**
 * @singleton
 */
export default class Account {
  constructor() {
    this.primaryKey = "id";
    this.props = {
      ...CommonAttributes,
      //Required
      password: { type: TYPES.STRING, ...required },
      firstName: { type: TYPES.STRING, ...required },
      lastName: { type: TYPES.STRING, ...required },

      //Options
      profileImg: { type: TYPES.STRING },
      pageContent: { collection: "pageTemplates", via: "accountId" },
      messages: { collection: "messages", via: "accountId" },
      creditCard: { collection: "creditCards", via: "accountId" },
    };
    this.func = CommonDBCrud(this, this.constructor.name);
  }

  associate(models) {
    //Connections
    this.props.primaryEmail = createRef(models.EmailAccount, { ...required, ...unique });
    this.props.emails = createCollection(models.EmailAccount);
  }
}

export const Table = {
  Type: env.mainDB,
  DeletionPolicy: env.deletionPolicy,
  Properties: {
    TableName: env.tableName(Account.constructor.name),
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
