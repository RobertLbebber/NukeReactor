/**
 * PageBuilderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var x = require("../../../frontend/src/assets/data/samplehtml.json");
var inputs = {
  sample: {
    description:
      "This will act as an example for Restful Connections to show that the connections are made and can product further testing",
    raw: "Its Somthing"
  },
  item: "things"
};

module.exports = {
  getSample: function(req, res) {
    console.log("getSample");
    res.send(x);
  },

  getAnotherSample: function(req, res) {
    console.log("getAnotherSample");
    res.send(v);
  },

  setSample: function(req, res) {
    console.log("setSample", req.body);
    res.send({ a: "setSample" });
  }
};
