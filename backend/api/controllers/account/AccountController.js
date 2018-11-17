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
  signin: function(req, res) {
    Account.create({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
      // pageContent: PageTemplates.findOne({ designName: "Blank" }),  //UN-Tested
    })
      .decrypt()
      .then(function(err, result) {
        if (err) {
          return res.negotiate(err);
        }
        if (result.password === result.param("password")) {
          req.session.userId = result.id; // returned from a database
          return res.json(Account.getPublicData(result));
        } else {
          res.status(401);
          return res.send({ error: "Invalid Credentials" });
        }
      });
  },

  login: function(req, res) {
    Account.findOne({ email: req.param("email") })
      .decrypt()
      .then(function(err, result) {
        if (err) {
          return res.negotiate(err);
        }
        if (result.password === result.param("password")) {
          req.session.userId = result.id; // returned from a database
          return res.json(Account.getPublicData(result));
        } else {
          res.status(401);
          return res.send({ error: "Invalid Credentials" });
        }
      });
  },

  logout: function(req, res) {
    Account.findOne({ id: req.session.userId }).then(function(err, result) {
      if (err) {
        return res.negotiate(err);
      }
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
    if (!req.session.userId) {
      res.status(410);
      return res.json({ error: "Account Not Active" });
    } else {
      Account.findOne({ id: req.session.userId }).then(function(err, result) {
        if (err) {
          return res.negotiate(err);
        }
        return res.json(Account.getPublicData(result));
      });
    }
  },

  getAccount: function(req, res) {
    Account.findOne({ serial: "Test" }).exec(function(err, result) {
      if (err) {
        return res.serverError(err);
      } else if (!result) {
        return res.serverError({ status: 404, message: "Account Not Found" });
      }
      res.send(result);
    });
  },

  saveUserData: function(req, res) {
    let body = req.body;
    PageTemplates.create({
      // Account.create({
      designName: "Blank",
      designCategory: "basic",
      pageLayout: body
    }).then(function(newOrExistingRecord) {
      return res.ok({
        message: "Element was Affected"
      });
    });
  },

  //Debugging and Development Purposes only
  createDefaultUser: async function(req, res) {
    console.log(4);
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
          req.session.userId = result.id; // returned from a database
          return res.json(Account.getPublicData(result));
        } else {
          res.status(401);
          return res.send({ error: "Invalid Credentials" });
        }
      }
    );
  }
};
