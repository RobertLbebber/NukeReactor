import _ from "lodash";
import Middleware from "../middleware/Middleware";
// import Account from "../db/models/Account.json.js";
import ResponseStatus, { GET, POST } from "../io/ResponseStatus";
import GenerateHandler from "./common/GenerateHandler";

export let AccountController = { tag: "AccountController" };

GenerateHandler.genFn(AccountController, "getMe", "account/getMe")((event, context, callback) => {
  let middles = Middleware.prep(event, context, AccountController);
  console.log("information");
  if (middles.fails > 0) {
    console.log("information 1");
    // callback(null, ResponseStatus(false, "Session was Invalid", 401));
    return ResponseStatus(false, "Session was Invalid", 401);
  } else {
    console.log("information 2");
    callback(null, ResponseStatus(true, { event, context }));
    return ResponseStatus(false, "Session was Invalid", 401);
  }
  console.log("information 3");
});

GenerateHandler.genFn(AccountController, "signup", "signup", false)((event, context, callback) => {
  let middles = Middleware.prep(event, context, AccountController);
  console.log("TODO::", context.function_name);
  return ResponseStatus(true, { event, context });
});

GenerateHandler.genFn(AccountController, "login", "login", false)((event, context, callback) => {
  let middles = Middleware.prep(event, context, AccountController);
  console.log("TODO::", context.function_name);
  return ResponseStatus(true, { event, context });
});

GenerateHandler.genFn(AccountController, "logout", "logout", false)((event, context, callback) => {
  let middles = Middleware.prep(event, context, AccountController);
  console.log("TODO::", context.function_name);
  return ResponseStatus(true, { event, context });
});

GenerateHandler.genFn(AccountController, "getAccountPage", "account/getAccountPage")((event, context, callback) => {
  let middles = Middleware.prep(event, context, AccountController);
  console.log("TODO::", context.function_name);
  return ResponseStatus(true, { event, context });
});

GenerateHandler.genFn(AccountController, "setAccountPage", "account/setAccountPage", true, POST)(
  (event, context, callback) => {
    let middles = Middleware.prep(event, context, AccountController);
    console.log("TODO::", context.function_name);
    return ResponseStatus(true, { event, context });
  }
);

GenerateHandler.genFn(AccountController, "getFeed", "account/getFeed")((event, context, callback) => {
  let middles = Middleware.prep(event, context, AccountController);
  console.log("TODO::", context.function_name);
  return ResponseStatus(true, { event, context });
});

GenerateHandler.genFn(AccountController, "createDefaultAccount", "account/createDefaultAccount")(
  (event, context, callback) => {
    let middles = Middleware.prep(event, context, AccountController);
    console.log("TODO::", context.function_name);
    return ResponseStatus(true, { event, context });
  }
);

GenerateHandler.genFn(AccountController, "addAccount", "account/addAccount", true, POST)((event, context, callback) => {
  let middles = Middleware.prep(event, context, AccountController);
  console.log("TODO::", context.function_name);
  return ResponseStatus(true, { event, context });
});

GenerateHandler.genFn(AccountController, "getAll", "account/getAll", true, GET, true)((event, context, callback) => {
  let middles = Middleware.prep(event, context, AccountController);
  console.log("TODO::", context.function_name);
  return ResponseStatus(true, { event, context });
});

GenerateHandler.genFn(AccountController, "runQuery", "runQuery", true, POST, true)((event, context, callback) => {
  let middles = Middleware.prep(event, context, AccountController);
  console.log("TODO::", context.function_name);
  return ResponseStatus(true, { event, context });
});

let endpoints = GenerateHandler.expFn(AccountController);
console.log(endpoints);
module.exports = { ...endpoints, AccountController };
