import _ from "lodash";
import Middleware from "../middleware/Middleware";
// import Account from "../db/models/Account.json.js";
import ResponseStatus from "../io/ResponseStatus";
import GH from "./common/GenerateHandler";
import { PRECONDITION } from "../io/HttpErrors";
import { GenericController } from "./common/GenericController";

class AccountController extends GenericController {}

let init = new AccountController()
  .create("getMe")
  .path("account/getMe")
  .fn(async (event, context) => {
    let middles = await Middleware.prep(event, context, init);
    return ResponseStatus(middles.fails === 0, middles);
  })

  //Signup
  .create("signup")
  .open()
  .fn((event, context, callback) => {
    let middles = Middleware.prep(event, context, init);
    console.log("TODO::", context.functionName);
    // return ResponseStatus(true, { event, context });
    return ResponseStatus(false, { message: "Session was Invalid", event, context, middles }, PRECONDITION);
  })

  //Login
  .create("login")
  .open()
  .fn((event, context) => {
    let middles = Middleware.prep(event, context, init);
    console.log("TODO::", context.functionName);
    return ResponseStatus(true, { event, context });
  })

  //Logout
  .create("logout")
  .open()
  .fn((event, context) => {
    let middles = Middleware.prep(event, context, init);
    console.log("TODO::", context.functionName);
    return ResponseStatus(true, { event, context });
  })

  //
  .create("getAccountPage")
  .path("account/", true)
  .fn((event, context) => {
    let middles = Middleware.prep(event, context, init);
    console.log("TODO::", context.functionName);
    return ResponseStatus(true, { event, context });
  })

  //
  .create("setAccountPage")
  .path("account/", true)
  .post()
  .fn((event, context) => {
    let middles = Middleware.prep(event, context, init);
    console.log("TODO::", context.functionName);
    return ResponseStatus(true, { event, context });
  })

  //
  .create("getFeed")
  .path("account/", true)
  .fn((event, context) => {
    let middles = Middleware.prep(event, context, init);
    console.log("TODO::", context.functionName);
    return ResponseStatus(true, { event, context });
  })

  //
  .create("createDefaultAccount")
  .path("account/", true)
  .fn((event, context) => {
    let middles = Middleware.prep(event, context, init);
    console.log("TODO::", context.functionName);
    return ResponseStatus(true, { event, context });
  })

  //
  .create("addAccount")
  .path("account/", true)
  .post()
  .fn((event, context) => {
    let middles = Middleware.prep(event, context, init);
    console.log("TODO::", context.functionName);
    return ResponseStatus(true, { event, context });
  })

  //
  .create("getAll")
  .path("account/", true)
  .debug()
  .fn((event, context) => {
    let middles = Middleware.prep(event, context, init);
    console.log("TODO::", context.functionName);
    return ResponseStatus(true, { event, context });
  })

  //
  .create("runQuery")
  .post()
  .debug()
  .fn((event, context) => {
    let middles = Middleware.prep(event, context, init);
    console.log("TODO::", context.functionName);
    return ResponseStatus(true, { event, context });
  });

let endpoints = GH.expFn(init);
module.exports = { ...endpoints, AccountController: init };
