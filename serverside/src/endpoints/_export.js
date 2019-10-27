import AccountController from "./Account/AccountController";
import SessionsController from "./Sessions/SessionsController";
import DebugController from "./DebugController";

export const paths = {
  AccountController: "Account/AccountController",
  SessionsController: "Sessions/SessionsController"
};

export default { AccountController, DebugController, SessionsController };
