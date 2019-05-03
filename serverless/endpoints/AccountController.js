import Middleware from "../middleware/Middleware";

let getMe = (event, context, callback) => {
  console.log(this.contructor.name);
  Middleware.prep(event, context, this.contructor.name);
};

export const AccountController = {
  getMe: {
    path: "account/getMe",
    rest: "GET",
    fn: getMe,
    session: true
  }
};

export const sessionRules = {};

let ends = [];
for (endpoints in AccountController) {
  ends.push(endpoints.fn);
}
module.export = {
  ...ends
};
