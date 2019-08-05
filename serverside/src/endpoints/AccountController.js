import _ from "lodash";
import Middleware from "../middleware/Middleware";
// import Account from "../db/models/Account.json.js";
import ResponseStatus, { GET, POST } from "../io/ResponseStatus";
import GenerateHandler from "./common/GenerateHandler";
import { PRECONDITION } from "../io/HttpErrors";

class AccountController {}
let init = new AccountController();

GenerateHandler.genFn(init, "getMe", "account/getMe")(async (event, context) => {
  let middles = await Middleware.prep(event, context, init);
  return ResponseStatus(middles.fails === 0, middles);
});

GenerateHandler.genFn(init, "signup", "signup", false)((event, context, callback) => {
  let middles = Middleware.prep(event, context, init);
  console.log("TODO::", context.functionName);
  // return ResponseStatus(true, { event, context });
  return ResponseStatus(false, { message: "Session was Invalid", event, context, middles }, PRECONDITION);
});

GenerateHandler.genFn(init, "login", "login", false)((event, context) => {
  let middles = Middleware.prep(event, context, init);
  console.log("TODO::", context.functionName);
  return ResponseStatus(true, { event, context });
});

GenerateHandler.genFn(init, "logout", "logout", false)((event, context) => {
  let middles = Middleware.prep(event, context, init);
  console.log("TODO::", context.functionName);
  return ResponseStatus(true, { event, context });
});

GenerateHandler.genFn(init, "getAccountPage", "account/getAccountPage")((event, context, callback) => {
  let middles = Middleware.prep(event, context, init);
  console.log("TODO::", context.functionName);
  return ResponseStatus(true, { event, context });
});

GenerateHandler.genFn(init, "setAccountPage", "account/setAccountPage", true, POST)((event, context, callback) => {
  let middles = Middleware.prep(event, context, init);
  console.log("TODO::", context.functionName);
  return ResponseStatus(true, { event, context });
});

GenerateHandler.genFn(init, "getFeed", "account/getFeed")((event, context, callback) => {
  let middles = Middleware.prep(event, context, init);
  console.log("TODO::", context.functionName);
  return ResponseStatus(true, { event, context });
});

GenerateHandler.genFn(init, "createDefaultAccount", "account/createDefaultAccount")((event, context, callback) => {
  let middles = Middleware.prep(event, context, init);
  console.log("TODO::", context.functionName);
  return ResponseStatus(true, { event, context });
});

GenerateHandler.genFn(init, "addAccount", "account/addAccount", true, POST)((event, context, callback) => {
  let middles = Middleware.prep(event, context, init);
  console.log("TODO::", context.functionName);
  return ResponseStatus(true, { event, context });
});

GenerateHandler.genFn(init, "getAll", "account/getAll", true, GET, true)((event, context, callback) => {
  let middles = Middleware.prep(event, context, init);
  console.log("TODO::", context.functionName);
  return ResponseStatus(true, { event, context });
});

GenerateHandler.genFn(init, "runQuery", "runQuery", true, POST, true)((event, context, callback) => {
  let middles = Middleware.prep(event, context, init);
  console.log("TODO::", context.functionName);
  return ResponseStatus(true, { event, context });
});

let endpoints = GenerateHandler.expFn(init);
module.exports = { ...endpoints, AccountController: init };
