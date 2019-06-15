import _ from "lodash";
import Middleware from "../middleware/Middleware";
// import Account from "../db/models/Account.json.js";
import ResponseStatus, { GET, POST } from "../io/ResponseStatus";
import GenerateHandler from "./common/GenerateHandler";
import { PRECONDITION } from "../io/HttpErrors";

export let AccountController = { tag: "AccountController" };

GenerateHandler.genFn(AccountController, "getMe", "account/getMe")(async (event, context, callback) => {
  let middles = await Middleware.prep(event, context, AccountController);
  if (middles.fails > 0) {
    // console.log(...ResponseStatus(false, { message: "Session was Invalid", event, context, middles }, PRECONDITION));
    return {
      statusCode: 200,
      body: JSON.stringify(middles),
      headers: { "Content-Type": "application/json" }
    };
    // callback(null, ...ResponseStatus(false, { message: "Session was Invalid", event, context, middles }, 412));
  } else {
    callback(null, ResponseStatus(true, { event, context, middles }));
  }
});

GenerateHandler.genFn(AccountController, "signup", "signup", false)((event, context, callback) => {
  let middles = Middleware.prep(event, context, AccountController);
  console.log("TODO::", context.functionName);
  // return ResponseStatus(true, { event, context });
  console.log(...ResponseStatus(false, { message: "Session was Invalid", event, context, middles }, PRECONDITION));
  return {
    statusCode: 200,
    body: JSON.stringify(middles),
    headers: {
      "Content-Type": "application/json"
    },
    ...ResponseStatus(false, { message: "Session was Invalid", event, context, middles }, PRECONDITION)
  };
});

GenerateHandler.genFn(AccountController, "login", "login", false)((event, context, callback) => {
  let middles = Middleware.prep(event, context, AccountController);
  console.log("TODO::", context.functionName);
  return ResponseStatus(true, { event, context });
});

GenerateHandler.genFn(AccountController, "logout", "logout", false)((event, context, callback) => {
  let middles = Middleware.prep(event, context, AccountController);
  console.log("TODO::", context.functionName);
  return ResponseStatus(true, { event, context });
});

GenerateHandler.genFn(AccountController, "getAccountPage", "account/getAccountPage")((event, context, callback) => {
  let middles = Middleware.prep(event, context, AccountController);
  console.log("TODO::", context.functionName);
  return ResponseStatus(true, { event, context });
});

GenerateHandler.genFn(AccountController, "setAccountPage", "account/setAccountPage", true, POST)(
  (event, context, callback) => {
    let middles = Middleware.prep(event, context, AccountController);
    console.log("TODO::", context.functionName);
    return ResponseStatus(true, { event, context });
  }
);

GenerateHandler.genFn(AccountController, "getFeed", "account/getFeed")((event, context, callback) => {
  let middles = Middleware.prep(event, context, AccountController);
  console.log("TODO::", context.functionName);
  return ResponseStatus(true, { event, context });
});

GenerateHandler.genFn(AccountController, "createDefaultAccount", "account/createDefaultAccount")(
  (event, context, callback) => {
    let middles = Middleware.prep(event, context, AccountController);
    console.log("TODO::", context.functionName);
    return ResponseStatus(true, { event, context });
  }
);

GenerateHandler.genFn(AccountController, "addAccount", "account/addAccount", true, POST)((event, context, callback) => {
  let middles = Middleware.prep(event, context, AccountController);
  console.log("TODO::", context.functionName);
  return ResponseStatus(true, { event, context });
});

GenerateHandler.genFn(AccountController, "getAll", "account/getAll", true, GET, true)((event, context, callback) => {
  let middles = Middleware.prep(event, context, AccountController);
  console.log("TODO::", context.functionName);
  return ResponseStatus(true, { event, context });
});

GenerateHandler.genFn(AccountController, "runQuery", "runQuery", true, POST, true)((event, context, callback) => {
  let middles = Middleware.prep(event, context, AccountController);
  console.log("TODO::", context.functionName);
  return ResponseStatus(true, { event, context });
});

let endpoints = GenerateHandler.expFn(AccountController);
module.exports = { ...endpoints, AccountController };
