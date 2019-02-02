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
  /**
   */
  signup: function(req, res) {
    if (req.body.password !== req.body.confirmation) {
      return res.sendStatus(400);
    }
    Account.create({
      email: req.body.emailAddress,
      firstName: req.body.fName,
      lastName: req.body.lName,
      password: req.body.password
      // pageContent: content
    })
      /* Error Catching */
      .tolerate("E_UNIQUE", () => {
        res.status(400);
        throw res.json({ errorMessage: "Email account not permitted." });
      })
      .fetch()
      .decrypt()
      .then(function(result) {
        res.cookie("account", JSON.stringify(Account.getPublicData(result)), {
          maxAge: 19000000
        });
        res.cookie("UID", JSON.stringify(result.id), {
          maxAge: 19000000,
          httpOnly: true
        });
        res.json(Account.getPublicData(result));
      })
      /* Error Shipping */
      .catch(input => {
        return input;
      });
  },

  /**
   */
  login: function(req, res) {
    Account.findOne({
      email: req.body.emailAddress
    })
      .decrypt()
      .exec(function(err, result) {
        if (_.isNil(result) || result.password !== req.param("password")) {
          res.status(400);
          return res.json({ errorMessage: "Invalid Credentials" });
        } else {
          res.cookie("account", JSON.stringify(Account.getPublicData(result)), {
            maxAge: 19000000
          });
          res.cookie("UID", JSON.stringify(result.id), {
            maxAge: 19000000,
            httpOnly: true
          });
          return res.json(Account.getPublicData(result));
        }
      });
  },

  /**
   */
  logout: function(req, res) {
    let id = JSON.parse(req.cookies.UID);
    if (_.isNil(id)) {
      res.status(500);
      res.clearCookie("account", { path: "/" });
      res.clearCookie("UID", { path: "/" });
      return res.json({ errorMessage: "Account Not Found" });
    } else {
      Account.findOne({ id: id }).exec(function(err, result) {
        if (!_.isNil(result)) {
          res.clearCookie("account", { path: "/" });
          res.clearCookie("UID", { path: "/" });
          res.status(200);
          return res.send({ message: "Successful Account Closure" });
        } else {
          res.status(410);
          return res.json({ errorMessage: "Account Not Active" });
        }
      });
    }
  },

  getMe: function(req, res) {
    if (!req.cookies || !req.cookies.UID) {
      res.status(410);
      return res.send({ errorMessage: "Account Not Active" });
    } else {
      Account.findOne({ id: JSON.parse(req.cookies.UID) })
        .decrypt()
        .exec(function(err, result) {
          if (_.isNil(result)) {
            return res.sendStatus(404);
          }
          return res.send(Account.getPublicData(result));
        });
    }
  },

  getAccount: function(req, res) {
    Account.findOne({ id: req.param("id") })
      .populate("pageContent")
      .exec(function(err, result) {
        sails.log(Account.getPublicData(result));
        if (_.isNil(result)) {
          res.sendStatus(404, {
            errorMessage: "Account Not Found"
          });
        } else {
          if (!_.isNil(result.pageContent[0])) {
            res.json(result.pageContent[0].pageLayout);
          } else {
            res.sendStatus(404, {
              errorMessage: "Account Data Not Found"
            });
          }
        }
      });
  },

  getFeed: function(req, res) {
    if (!req.cookies || !req.cookies.UID) {
      res.status(410);
      return res.send({ errorMessage: "Account Not Active" });
    } else {
      Subscription.find({ accountId: JSON.parse(req.cookies.UID) })
        .populate("account")
        .exec(function(err, result) {
          if (_.isNil(result)) {
            return res.sendStatus(404);
          } else {
            let listOfIds = _.map(result, item => item.id);
            sails.log(listOfIds);
            Messages.find({ accountId: listOfIds })
              .populate("account")
              .exec(function(err, result) {
                if (_.isNil(result)) {
                  return res.send(Account.getPublicData(result));
                }
              });
          }
        });
    }
  },

  saveUserData: function(req, res) {
    let body = req.body;
    PageTemplates.create({
      // Account.create({
      designName: "Blank",
      designCategory: "Basic",
      pageLayout: body
    }).exec(function(err, newOrExistingRecord) {
      return res.ok({
        message: "Element was Affected"
      });
    });
  },

  /**
   * @Debug
   */
  createDefaultUser: async function(req, res) {
    Account.createAndGet(
      {
        email: "testuser@site.com",
        firstName: "Test",
        lastName: "User",
        password: "password"
        // pageContent: PageTemplates.findOne({ designName: "Default" }).exec(
        //   function(err, result) {
        //     console.log(result);
        //     return ;
        //   }
        // ) //UN-Tested
      },
      function(result) {
        console.log("HERE", result);
        // if (err) {
        //   return res.negotiate(err);
        // } else if (!result) {
        //   return res.send({
        //     error: 400,
        //     message: "Data Not Found"
        //   });
        // }
        // result.decrypt();
        if (result.password === "password") {
          req.session.userId = result._id; // returned from a database
          return res.json(Account.getPublicData(result));
        } else {
          res.status(401);
          return res.send({ errorMessage: "Invalid Credentials" });
        }
      }
    );
  },

  /**
   * @Debug
   */
  addAccount: function(req, res) {
    Account.create({
      email: req.body.email,
      firstName: req.body.fName,
      lastName: req.body.lName,
      password: req.body.password
    })
      .fetch()
      .exec(function(err, newOrExistingRecord) {
        console.log(newOrExistingRecord);
        return res.sendStatus(200);
      });
  },

  /**
   * @Debug
   */
  getAll: function(req, res) {
    Account.find().exec(function(err, newOrExistingRecord) {
      console.log(err, newOrExistingRecord);
      return res.json(newOrExistingRecord);
    });
  },

  /**
   * @Debug
   */
  runQuery: function(req, res) {
    Account.find({ ...req.body.json }).exec((err, result) => {
      console.log(err, result);
      res.status(200);
      res.json({ message: "look At the Server logs" });
    });
  }
};
