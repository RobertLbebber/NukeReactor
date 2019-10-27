import _ from "lodash";
import Middleware from "../../middleware/Middleware";
// import Account from "../db/models/Account.json.js";
import ResponseStatus from "../../io/ResponseStatus";
import GH from "../_common/GenerateHandler";
import { GenericController } from "../_common/GenericController";
import Sessions from "../../db/models/Sessions.json.js";
import Requests from "./Requests";
import { UNPROCESSABLE_ENTITY } from "../../io/HttpErrors";
import Account from "../../db/models/Account.json";

class SessionsController extends GenericController {}

let init = new SessionsController()
  //Creates a session for user
  .create("createSession")
  .path("session")
  .post()
  .fn(async (event, context) => {
    // let middles = await Middleware.prep(event, context, init);
    Requests.createSession(event);
    return ResponseStatus(middles.fails === 0, middles);
  })
  //GET Check user's session
  .create("checkSession")
  .path("session")
  .fn(async (event, context) => {
    let middles = await Middleware.prep(event, context, init);
    return ResponseStatus(middles.fails === 0, middles);
  })
  //Destroy user's session
  .create("destroySession")
  .path("session")
  .deleter()
  .fn(async (event, context) => {
    // let middles = await Middleware.prep(event, context, init);
    Requests.destroySession(event);
    return ResponseStatus(middles.fails === 0, middles);
  })
  //Check user's session
  .create("newUser")
  .path("session")
  .put()
  .fn(async (event, context) => {
    // let middles = await Middleware.prep(event, context, init);
    let checkResponse = Requests.newUser(event);
    console.log(checkResponse);
    if (checkResponse.ok) {
      try {
        let crudResponse = await Account.func.create(checkResponse.data);
        console.log(crudResponse);
        return ResponseStatus(true, "Creation Completion");
      } catch (error) {
        return ResponseStatus(false, error.message, UNPROCESSABLE_ENTITY);
      }
    } else {
      return ResponseStatus(false);
    }
  });

let endpoints = GH.expFn(init);
module.exports = { ...endpoints, SessionsController: init };
