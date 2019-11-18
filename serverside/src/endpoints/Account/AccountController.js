import _ from "lodash";
import Middleware from "../../middleware/Middleware";
import ResponseStatus from "../../io/ResponseStatus";
import GH from "../_common/GenerateHandler";
import { GenericController } from "../_common/GenericController";
import { NOT_IMPLEMENTED } from "../../io/HttpErrors";

class AccountController extends GenericController {}

let init = new AccountController()
  .create("getMe")
  .path("account/getMe")
  .fn(async (event, context, endpoint, globals) => {
    return ResponseStatus(false, middles, NOT_IMPLEMENTED);
  })

  //
  .create("getAccountPage")
  .path("account/{accountId}/page")
  .fn(async (event, context, endpoint) => {
    return ResponseStatus(false, { event, context }, NOT_IMPLEMENTED);
  })

  //
  .create("setAccountPage")
  .path("account/{accountId}/page")
  .post()
  .fn(async (event, context) => {
    return ResponseStatus(false, { event, context }, NOT_IMPLEMENTED);
  })

  //
  .create("getFeed")
  .path("feed/")
  .fn(async (event, context) => {
    return ResponseStatus(false, { event, context }, NOT_IMPLEMENTED);
  })

  //
  .create("createDefaultAccount")
  .path("account/default")
  .fn(async (event, context) => {
    return ResponseStatus(false, { event, context }, NOT_IMPLEMENTED);
  })

  //
  .create("addAccount")
  .path("account/new")
  .post()
  .fn(async (event, context) => {
    return ResponseStatus(false, { event, context }, NOT_IMPLEMENTED);
  })

  //
  .create("getAll")
  .path("account/all")
  .debug()
  .fn(async (event, context) => {
    return ResponseStatus(false, { event, context }, NOT_IMPLEMENTED);
  })

  //
  .create("runQuery")
  .post()
  .debug()
  .fn(async (event, context) => {
    return ResponseStatus(false, { event, context }, NOT_IMPLEMENTED);
  });

let endpoints = GH.expFn(init);
module.exports = { ...endpoints, AccountController: init };
