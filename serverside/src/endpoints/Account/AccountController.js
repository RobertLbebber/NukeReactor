import _ from "lodash";
import Middleware from "../../middleware/Middleware";
import ResponseStatus from "../../io/ResponseStatus";
import GH from "../_common/GenerateHandler";
import { GenericController } from "../_common/GenericController";
import { NOT_IMPLEMENTED, FORBIDDEN } from "../../io/HttpErrors";
import Requests from "./Requests";
import AccountSingleton, { AccountGn } from "../../db/models/Account.json";
import EmailAccountSingleton from "../../db/models/EmailAccount.json";
import SessionsSingleton from "../../db/models/Sessions.json";
import Sessions from "../../../dist/db/models/Sessions.json";

class AccountController extends GenericController {}

let init = new AccountController()
  .create("getMe")
  .path("account/getMe")
  .fn(async (event, context, endpoint, globals) => {
    return ResponseStatus(true);
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
  .open()
  .request(Requests.ACCOUNT_CREATE)
  .fn(async ({ body }) => {
    let parameters = JSON.parse(body);
    if (_.get(parameters, "password", undefined) !== _.get(parameters, "confirmation", null)) {
      return ResponseStatus(false, "Password Pair didn't match", FORBIDDEN);
    }
    const EmailAccount = EmailAccountSingleton.getInstance();
    const Account = AccountSingleton.getInstance();
    const Session = SessionsSingleton.getInstance();
    let emailResult = await EmailAccount.fn.createGet({ [EmailAccount.primaryKey]: _.get(parameters, "emailAddress") });
    let primaryEmail = _.get(emailResult, "Item.email");
    let accountResult = await Account.fn.createGet(
      AccountGn(
        _.get(parameters, "firstName"),
        _.get(parameters, "lastName"),
        primaryEmail,
        _.get(parameters, "password"),
      ),
    );
    let session = await Session.fn.createGet({
      accountId: _.get(accountResult, "Item.id"),
      emailAccountId: primaryEmail,
    });
    if (_.has(session, "Item.id")) {
      return ResponseStatus(true, { session: _.get(session, "Item.id") });
    } else {
      return ResponseStatus(false);
    }
  })

  //
  .create("getAll")
  .path("account/all")
  .debug()
  .open()
  .fn(async (event, context) => {
    const Account = AccountSingleton.getInstance();
    let result = await Account.fn.scan();
    delete result.response.request;
    console.log(result.response);
    return ResponseStatus(true, { ...result.response });
  })

  //
  .create("runQuery")
  .post()
  .debug()
  .open()
  .fn(async ({ body }, context) => {
    const Account = AccountSingleton.getInstance();
    let parameters = JSON.parse(body);
    let result = await Account.fn.query(_.get(parameters, "query"));
    return ResponseStatus(true, { ...result.response });
  });

let endpoints = GH.expFn(init);
module.exports = { ...endpoints, AccountController: init };
