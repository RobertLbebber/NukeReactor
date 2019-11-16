import _ from "lodash";
import Middleware from "../../middleware/Middleware";
// import Account from "../db/models/Account.json.js";
import ResponseStatus from "../../io/ResponseStatus";
import GH from "../_common/GenerateHandler";
import { GenericController } from "../_common/GenericController";

class AccountController extends GenericController {}

let init = new AccountController()
  .create("getMe")
  .path("account/getMe")
  .fn(async (event, context) => {
    let middles = await Middleware.prep(event, context, init);
    return ResponseStatus(middles.fails === 0, middles);
  })

  //
  .create("getAccountPage")
  .path("account/{accountId}/page")
  .fn((event, context) => {
    let middles = Middleware.prep(event, context, init);
    console.log("TODO::", context.functionName);
    return ResponseStatus(true, { event, context });
  })

  //
  .create("setAccountPage")
  .path("account/{accountId}/page")
  .post()
  .fn((event, context) => {
    let middles = Middleware.prep(event, context, init);
    console.log("TODO::", context.functionName);
    return ResponseStatus(true, { event, context });
  })

  //
  .create("getFeed")
  .path("feed/")
  .fn((event, context) => {
    let middles = Middleware.prep(event, context, init);
    console.log("TODO::", context.functionName);
    return ResponseStatus(true, { event, context });
  })

  //
  .create("createDefaultAccount")
  .path("account/default")
  .fn((event, context) => {
    let middles = Middleware.prep(event, context, init);
    console.log("TODO::", context.functionName);
    return ResponseStatus(true, { event, context });
  })

  //
  .create("addAccount")
  .path("account/new")
  .post()
  .fn((event, context) => {
    let middles = Middleware.prep(event, context, init);
    console.log("TODO::", context.functionName);
    return ResponseStatus(true, { event, context });
  })

  //
  .create("getAll")
  .path("account/all")
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
