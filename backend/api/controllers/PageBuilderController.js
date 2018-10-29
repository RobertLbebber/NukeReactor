/**
 * PageBuilderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
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
    res.json({ a: "this is something" });
  },

  getAnotherSample: function(req, res) {
    console.log("getAnotherSample");
  },

  setSample: function(req, res) {
    console.log("setSample", req.body);
    res.send({ a: "setSample" });
  }
};
