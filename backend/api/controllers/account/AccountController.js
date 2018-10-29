/**
 * AccountController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let content = require("../../../assets/sampleData/content.js");

var output = {
  sample: {
    description: "Customizable User Data Sample",
    userData: content
  }
};

module.exports = {
  getAccount: function(req, res) {
    Account.findOne({ serial: "Test" }).exec(function(err, element) {
      console.log("Get ", element);
      if (err) {
        return res.serverError(err);
      } else if (!element) {
        return res.serverError({ status: 404, message: "Account Not Found" });
      }
      res.send(element.pageContent);
      // res.send(output.sample.userData);
    });
  },

  saveUserData: function(req, res) {
    let body = req.body;
    Account.updateOrCreate(
      { serial: "Test" },
      { serial: "Test", pageContent: body }
    ).then(function(newOrExistingRecord) {
      return res.ok({
        message: "Element was Affected"
      });
    });
  }
};
