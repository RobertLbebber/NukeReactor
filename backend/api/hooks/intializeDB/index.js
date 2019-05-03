const globals = require("../../../config/globals").globals;

module.exports = function myBasicHook(sails) {
  return {
    initialize: async function(cb) {
      sails.on("hook:orm:loaded", async function() {
        let y = await sails.models.account.updateOrCreate(
          {
            email: globals.dev.defaultAccount.email
          },
          {
            email: globals.dev.defaultAccount.email,
            firstName: globals.dev.defaultAccount.firstName,
            lastName: globals.dev.defaultAccount.lastName,
            password: globals.dev.defaultAccount.password
          }
        );
        await sails.models.pagetemplates.createDefaultTemplate(y.response[0].id);
        let x = await sails.models.pagetemplates.getDefaultTemplate();
        return cb();
      });
    }
  };
};
