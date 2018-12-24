/**
 * PageTemplates.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

let content = require("../../assets/sampleData/content.js");

module.exports = {
  createDefaultTemplate: async function(accountId) {
    console.log(content);
    console.log(accountId);
    await this.create({
      designName: "Default",
      designCategory: "Basic",
      pageLayout: content,
      accountId: accountId ? accountId : null
    });
  },

  getDefaultTemplate: async function() {
    let result = await this.findOne({ designName: "Default" });
    console.log(result.pageLayout);
    return result;
  },

  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    id: { columnName: "_id", type: "string", required: true },
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
