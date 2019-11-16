import _ from "lodash";
import Policy from "./Policy";
import Session from "./Session";
import GenerateHandler from "../endpoints/_common/GenerateHandler";
import env, { DEVELOPMENT } from "../config/env";
import { SERVER_DEFAULT } from "../io/HttpErrors";

export const prep = async (event, context, controller) => {
  try {
    let result = { fails: 0, messages: [], ok: true };
    let shortName = GenerateHandler.baseFnName(context.functionName, controller.getName());
    let currentRules = controller[shortName];

    if (!_.isNil(currentRules)) {
      //Handle Sessions
      if (currentRules.session) {
        result.session = await Session.handleSession(event, currentRules);
        if (!_.isNil(result.session.status) && !result.session.status) {
          result.fails++;
        }
        if (!_.isNil(result.session.message)) {
          result.messages.push(result.session.message);
        }
      }

      //Handle Policies
      if (!_.isNil(currentRules.policies) && currentRules.policies.length > 0) {
        result.policy = Policy.handlerPolicies(currentRules);
        if (!_.isNil(result.policy.status) && !result.policy.status) {
          result.fails++;
        }
        if (!_.isNil(result.policy.message)) {
          result.messages.push(result.policy.message);
        }
      }

      //Dynamic Path Validation
      if (!_.isEmpty(currentRules.dynamicPath)) {
        let hasAllDynPath = _.every(currentRules.dynamicPath, path => event.pathParameters.includes(path));
        if (!hasAllDynPath) {
          result.fails++;
          result.messages.push("Dynamic URL Path(s) Not Provided");
        }
      }

      //Handle Schema
      if (!_.isNil(currentRules.schema) && !currentRules.schema(event).valid) {
        result.fails++;
        result.messages.push("Validation Failure");
      }
    } else {
      let contents = {};
      if (env.mode === DEVELOPMENT) {
        content = { shortName, currentRules, controller };
      }
      console.log("Error Being thrown", contents);
      throw new Error("Functions not found", contents);
    }

    result.ok = result.fails === 0;
    return result;
  } catch (error) {
    console.log("Error Being Catched", error);

    return { fails: 1, error: error.message, ok: false, errorCode: SERVER_DEFAULT };
  }
};

export default { prep };
