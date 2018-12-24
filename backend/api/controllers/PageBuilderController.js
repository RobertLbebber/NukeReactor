/**
 * PageBuilderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

let content = require("../../assets/sampleData/content.js");

var inputs = {
  sample: {
    description:
      "This will act as an example for Restful Connections to show that the connections are made and can product further testing",
    raw: "Its Somthing"
  },
  item: "things"
};

module.exports = {
  createDefaultTemplate: function(req, res) {
    PageTemplates.create(
      {
        designName: "Default",
        designCategory: "Basic",
        pageLayout: content
        // accountId: null
      },
      function(err, result) {
        if (err) {
          if (err.code === "E_UNIQUE") {
            res.send({
              error: 400,
              message: "Could Not Complete Request"
            });
          } else {
            res.send({
              error: 500,
              message: "Unknown Error"
            });
          }
        }
        res.send(result);
      }
    );
  },

  getDefaultTemplate: function(req, res) {
    PageTemplates.findOne({ designName: "Default" }).then(function(
      err,
      result
    ) {
      if (err) {
        return res.serverError(err);
      } else if (!result) {
        res.send({
          error: 400,
          message: "Data Not Found"
        });
      } else {
        res.send(result.pageLayout);
      }
    });
  }
};
