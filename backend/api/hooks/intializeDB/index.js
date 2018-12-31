module.exports = function myBasicHook(sails) {
  return {
    initialize: async function(cb) {
      sails.on("hook:orm:loaded", async function() {
        let y = await sails.models.account.updateOrCreate(
          {
            email: "bebber@electr.net"
          },
          {
            email: "bebber@electr.net",
            firstName: "Robert",
            lastName: "Bebber",
            password: "q"
          }
        );
        await sails.models.pagetemplates.createDefaultTemplate(
          y.response[0].id
        );
        let x = await sails.models.pagetemplates.getDefaultTemplate();
        return cb();
      });
    }
  };
};
