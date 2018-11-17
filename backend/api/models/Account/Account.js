/**
 * Account/Account.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  createAndGet: async function(values, cb) {
    let query = await this.create(values)
      .fetch()
      .decrypt();
    return await cb(query);
  },

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
  getPublicData: function(fullAccount) {
    return {
      email: fullAccount.email,
      firstName: fullAccount.firstName,
      lastName: fullAccount.lastName,
      pageContent: fullAccount.pageContent
    };
  },
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    //Generic
    id: { type: "number", autoIncrement: true },
    createdAt: { type: "number", autoCreatedAt: true },
    updatedAt: { type: "number", autoUpdatedAt: true },

    //Account Structure
    email: { type: "string", required: true, encrypt: true },
    password: { type: "string", required: true, encrypt: true },
    firstName: { type: "string", required: true, encrypt: true },
    lastName: { type: "string", required: true, encrypt: true },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    //Account References
    pageContent: { collection: "pageTemplates", via: "accountId" },
    creditCard: { collection: "creditCards", via: "accountId" }
  }
};
