/**
 * PageTemplates.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

let content = require("../../assets/sampleData/content.js");
const globals = require("../../config/globals").globals;

module.exports = {
  updateOrCreate: function(criteria, values) {
    var self = this; // reference for use by callbacks
    // If no values were specified, use criteria
    if (!values) values = criteria.where ? criteria.where : criteria;

    return this.findOne(criteria).then(async function(result) {
      if (result) {
        let response = await self.update(criteria, values).fetch();
        return {
          wasCreated: false,
          response: response
        };
      } else {
        let response = await self.create(values).fetch();
        return { wasCreated: true, response: response };
      }
    });
  },

  createDefaultTemplate: async function(accountId) {
    if (globals.dev.dev_mode) {
      sails.log("Dropping Default Template For Replacement");
    }
    await this.destroy({ designName: "Default" });
    await this.create({
      designName: "Default",
      designCategory: "Basic",
      pageLayout: content,
      accountId: accountId ? accountId : null
    });
  },

  getDefaultTemplate: async function() {
    return await this.find({ designName: "Default" }).limit(1);
  },

  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    id: { columnName: "_id", type: "string", autoIncrement: true },
    // createdAt: { type: "number", autoCreatedAt: true },
    // updatedAt: { type: "number", autoUpdatedAt: true },
    serial: { type: "string" },

    designName: { type: "string", required: true, unique: true },
    designCategory: { type: "string" },
    pageLayout: { type: "json" },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    accountId: { model: "account" }
  }
};
