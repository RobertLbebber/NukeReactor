/**
 * PageTemplates.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
import Attributes, { type } from "./common/Attributes";
import Account from "./Account.json";
import env from "../../config/env";

export const Model = {
  primaryKey: "id",
  props: {
    ...Attributes.createdDate,
    ...Attributes.updatedDate,
    serial: { ...type.STRING },
    designName: { ...type.STRING },
    designCategory: { ...type.STRING },
    pageLayout: { ...type.STRING },
    accountId: { ...type.REF(Account) }
  }
};

export const Table = {
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
  Type: env.mainDB,
  DeletionPolicy: "Retain",
  Properties: {
    TableName: env.tableName("PageTemplates"),
    KeySchema: [
      {
        AttributeName: "id",
        KeyType: "HASH"
      }
    ],
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
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

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
  }
};
export default Model;
