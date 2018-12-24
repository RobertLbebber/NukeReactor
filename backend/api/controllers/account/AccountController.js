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
   * @deprecated
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
      // pageContent: PageTemplates.findOne({ designName: "Blank" }),  //UN-Tested
    })
      .intercept("E_UNIQUE", "emailAlreadyInUse")
      .fetch()
      .decrypt()
      .exec(function(err, result) {
        // req.session.userId = result.id;
        res.cookie("email", result.email, {
          maxAge: 19000000,
          httpOnly: true
        });
        res.json(Account.getPublicData(result));
      });
  },

  /**
   * @deprecated
   */
  login: function(req, res) {
    Account.findOne({
      email: req.body.emailAddress
    })
      .decrypt()
      .exec(function(err, result) {
        console.log(result);
        if (_.isNil(result)) {
          res.status(401);
          return res.json({ error: "Invalid Credentials" });
        }
        if (result.password === req.param("password")) {
          // req.session.userId = result.id; // returned from a database
          return res.json(Account.getPublicData(result));
        } else {
          res.status(400);
          return res.json({ error: "Unknown Failure" });
        }
      });
  },

  /**
   * @deprecated
   */
  logout: function(req, res) {
    Account.findOne({ id: req.session.userId }).exec(function(err, result) {
      if (result) {
        req.session.userId = null; // returned from a database
        res.status(200);
        return res.send({ message: "Successful Account Closure" });
      } else {
        res.status(410);
        return res.send({ error: "Account Not Active" });
      }
    });
  },

  getMe: function(req, res) {
    if (!req.cookies || !req.cookies.email) {
      res.status(410);
      return res.send({ error: "Account Not Active" });
    } else {
      Account.findOne({ email: req.cookies.email })
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
    Account.findOne({ email: req.param("email") })
      .populate("pageContent")
      .exec(function(err, result) {
        if (_.isNil(result)) {
          return res.sendStatus(404, {
            status: 404,
            message: "Account Not Found"
          });
        }
        res.send(result.pageContent[0].pageLayout);
      });
  },

  saveUserData: function(req, res) {
    let body = req.body;
    PageTemplates.create({
      // Account.create({
      designName: "Blank",
      designCategory: "basic",
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
          return res.send({ error: "Invalid Credentials" });
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
  }
};
