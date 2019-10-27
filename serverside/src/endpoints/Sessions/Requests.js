import { Validator, validate } from "jsonschema";
import { AccountGn } from "../../db/models/Account.json";

const createSession = event => {
  const validator = new Validator();
  let schema = {
    id: "/createSession",
    type: "object",
    properties: {
      formData: {
        type: "object",
        emailAddress: { type: "string" },
        password: { type: "string" },
        rememberMe: { type: "boolean" }
      }
    },
    required: ["formData"]
  };
  validator.addSchema(schema);
  console.log(validate(event.body));
  return validate(event.body);
};

const newUser = event => {
  let requestObj = JSON.parse(event.body);
  let schema = {
    type: "object",
    properties: {
      formData: {
        type: "object",
        fName: { type: "string" },
        lName: { type: "string" },
        emailAddress: { type: "string" },
        password: { type: "string" },
        confirmation: { type: "string" }
      }
    }
  };
  const validator = new Validator();
  let validationScore = validator.validate(requestObj, schema);
  if (requestObj.formData.password !== requestObj.formData.confirmation) {
    return { ok: false, data: undefined, errors: "Invalid Password Combination" };
  }
  let accountModel = AccountGn(
    requestObj.formData.fName,
    requestObj.formData.lName,
    requestObj.formData.emailAddress,
    requestObj.formData.password
  );

  return { ok: validationScore.errors.length == 0, data: accountModel, errors: validationScore.errors };
};

const destroySession = event => {
  const validator = new validator();
  let schema = { id: "/destroySession", type: "object", properties: { sessionId: { type: "string" } } };
  validator.addSchema(schema);
  return validator.validate(event.headers);
};

export default {
  createSession,
  destroySession,
  newUser
};
