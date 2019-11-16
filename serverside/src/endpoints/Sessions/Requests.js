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
