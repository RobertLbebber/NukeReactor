/**
 * Messages.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  /**
   * Increment or Decrement the an action of the message
   * @param {Boolean} incDec -
   * @param {String} action -
   * TODO @-param User ID
   */
  crementAction: async function(incDec, action = "likes") {
    this.update({ [action]: incDec ? 1 : -1 });
  },

  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    id: { columnName: "_id", type: "string", autoIncrement: true },
    //Date Create & Date Added
    mainMessage: { type: "string", required: true },
    extraMessage: { type: "string" },
    // actions: {
    likes: { type: "number", defaultsTo: 0 /**User IDs connected To Each like */ },
    shares: { type: "number", defaultsTo: 0 /**User IDs connected To Each share */ },
    // },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    accountId: { model: "account", required: true }
  }
};
