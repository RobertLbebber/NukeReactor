import { Validator, validate } from "jsonschema";
import { AccountGn } from "../../db/models/Account.json";

export default {
  SESSION_CREATE: {
    id: "/createSession",
    type: "object",
    properties: {
      formData: {
        type: "object",
        emailAddress: { type: "string" },
        password: { type: "string" },
        rememberMe: { type: "boolean" },
      },
    },
    required: ["formData"],
  },
  SESSION_NEW: {
    type: "object",
    properties: {
      formData: {
        type: "object",
        fName: { type: "string" },
        lName: { type: "string" },
        emailAddress: { type: "string" },
        password: { type: "string" },
        confirmation: { type: "string" },
      },
    },
  },
  SESSION_DELETE: { id: "/destroySession", type: "object", properties: { sessionId: { type: "string" } } },
};

const createSession = event => {
  new Validator().addSchema(SESSION_CREATE);
  console.log(validate(event.body));
  return validate(event.body);
};

const newUser = event => {
  let requestObj = JSON.parse(event.body);
  let validationScore = new Validator().validate(requestObj, SESSION_NEW);
  if (requestObj.formData.password !== requestObj.formData.confirmation) {
    return { ok: false, data: undefined, errors: "Invalid Password Combination" };
  }
  let accountModel = AccountGn(
    requestObj.formData.fName,
    requestObj.formData.lName,
    requestObj.formData.emailAddress,
    requestObj.formData.password,
  );

  return { ok: validationScore.errors.length == 0, data: accountModel, errors: validationScore.errors };
};
