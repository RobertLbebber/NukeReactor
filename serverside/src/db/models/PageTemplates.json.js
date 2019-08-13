import Attributes, { TYPES } from "./common/Attributes";
import Account from "./Account.json";
import env from "../../config/env";
import CommonDBCrud from "../oper/CommonDBCrud";

const TableName = env.tableName("PageTemplates");

export const Model = {
  primaryKey: "id",
  props: {
    ...Attributes,
    serial: { type: TYPES.STRING },
    designName: { type: TYPES.STRING },
    designCategory: { type: TYPES.STRING },
    pageLayout: { type: TYPES.STRING },
    accountId: { type: new TYPES.REF(Account) }
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
// updateOrCreate: function(criteria, values) {
//   var self = this; // reference for use by callbacks
//   // If no values were specified, use criteria
//   if (!values) values = criteria.where ? criteria.where : criteria;

//   return this.findOne(criteria).then(async function(result) {
//     if (result) {
//       let response = await self.update(criteria, values).fetch();
//       return {
//         wasCreated: false,
//         response: response
//       };
//     } else {
//       let response = await self.create(values).fetch();
//       return { wasCreated: true, response: response };
//     }
//   });
// },

// createDefaultTemplate: async function(accountId) {
//   if (globals.dev.dev_mode) {
//     sails.log("Dropping Default Template For Replacement");
//   }
//   await this.destroy({ designName: "Default" });
//   await this.create({
//     designName: "Default",
//     designCategory: "Basic",
//     pageLayout: content,
//     accountId: accountId ? accountId : null
//   });
// },

// getDefaultTemplate: async function() {
//   return await this.find({ designName: "Default" }).limit(1);
// },
export default Model;
