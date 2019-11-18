import Attributes, { TYPES, createRef } from "./common/Attributes";
import env from "../../config/env";
import CommonDBCrud from "../oper/CommonDBCrud";

export default class PageTemplates {
  constructor() {
    this.primaryKey = "id";
    this.props = {
      ...Attributes,
      serial: { type: TYPES.STRING },
      designName: { type: TYPES.STRING },
      designCategory: { type: TYPES.STRING },
      pageLayout: { type: TYPES.STRING },
    };
    this.func = CommonDBCrud(this, PageTemplates.constructor.name);
  }
  associate(models) {
    this.props.accountId = createRef(models.Account);
  }
}

export const Table = {
  Type: env.mainDB,
  DeletionPolicy: env.deletionPolicy,
  Properties: {
    TableName: env.tableName(PageTemplates.constructor.name),
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
