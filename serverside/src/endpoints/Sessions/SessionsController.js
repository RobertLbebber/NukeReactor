import _ from "lodash";
import ResponseStatus from "../../io/ResponseStatus";
import GH from "../_common/GenerateHandler";
import { GenericController } from "../_common/GenericController";
import Sessions from "../../db/models/Sessions.json.js";
import Requests from "./Requests";
import { INVALID_INPUT, UNPROCESSABLE_ENTITY, NOT_IMPLEMENTED } from "../../io/HttpErrors";
import Account from "../../db/models/Account.json";
import env, { DEVELOPMENT } from "../../config/env";

class SessionsController extends GenericController {}

let init = new SessionsController()

  //Creates a session for user
  .create("createSession")
  .post()
  .open()
  .path("session")
  .schema(Requests.SESSION_CREATE)
  .fn(async (event, context) => {
    let parameters = JSON.parse(event.body);
    if (env.mode === DEVELOPMENT) {
      console.log("before", parameters.formData.emailAddress, parameters.formData);
      let existingSession = await Sessions.func.create({ id: parameters.formData.emailAddress, accountId: null });
      console.log("existingSession", existingSession);
      if (!_.isNil(existingSession)) {
        return ResponseStatus();
      } else {
        return ResponseStatus(false, "Unable To Create Session", DATABASE_FAILURE);
      }
    } else {
      let existingAccount = await Account.func.get({
        email: parameters.formData.emailAddress,
        password: parameters.formData.password,
      });
      console.log("existingAccounte", existingAccount);

      if (!_.isNil(existingAccount)) {
        let existingSession = await Sessions.func.create({ accountId: existingAccount.id });
        console.log("existingSession", existingSession);
        if (!_.isNil(existingSession)) {
          return ResponseStatus();
        } else {
          return ResponseStatus(false, "Unable To Create Session", DATABASE_FAILURE);
        }
      } else {
        return ResponseStatus(false, "No Existing Account Found", NOT_FOUND);
      }
    }
  })

  //GET Check user's session
  .create("checkSession")
  .path("session")
  .fn(async (event, context) => {
    return ResponseStatus(false, middles, NOT_IMPLEMENTED);
  })

  //Destroy user's session
  .create("destroySession")
  .deleter()
  .path("session")
  .schema(Requests.SESSION_DELETE)
  .fn(async (event, context) => {
    return ResponseStatus(false, middles, NOT_IMPLEMENTED);
  })

  //Check user's session
  .create("newUser")
  .put()
  .open()
  .path("session")
  .schema(Requests.SESSION_NEW)
  .fn(async (event, context) => {
    let formData = _.get(JSON.parse(event.body), "formData");
    if (_.get(formData, "password") !== _.get(formData, "confirmation")) {
      return ResponseStatus(false, "Invalid Password Combination", INVALID_INPUT);
    }
    let accountModel = AccountGn(formData.fName, formData.lName, formData.emailAddress, formData.password);

    try {
      let crudResponse = await Account.func.create(accountModel);
      console.log(crudResponse);
      return ResponseStatus(true, "Creation Completion");
    } catch (error) {
      return ResponseStatus(false, error.message, UNPROCESSABLE_ENTITY);
    }
  });

let endpoints = GH.expFn(init);
module.exports = { ...endpoints, SessionsController: init };
