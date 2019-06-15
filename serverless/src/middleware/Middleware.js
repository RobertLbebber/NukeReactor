import _ from "lodash";
import Policy from "./Policy";
import Session from "./Session";
import GenerateHandler from "../endpoints/common/GenerateHandler";

export const prep = async (event, context, rules) => {
  try {
    let result = { fails: 0 };
    let shortName = GenerateHandler.baseFnName(context.functionName, rules.tag);
    console.log("Middleware.prep 1", shortName, rules);
    let currentRules = rules[shortName];

    if (!_.isNil(currentRules)) {
      //Handle Sessions
      if (currentRules.session) {
        console.log("Start Session");
        result.session = await Session.handleSession(event, currentRules);
        console.log("End Session", result);
        console.log(!_.isNil(result.session.status), !result.session.status);
        if (!_.isNil(result.session.status) && !result.session.status) {
          result.fails++;
          console.log("Fail Increase", result.fails);
        }
      }

      //Handle Policies
      if (!_.isNil(currentRules.policies) && currentRules.policies.length > 0) {
        result.policy = Policy.handlerPolicies(currentRules);
        if (!_.isNil(result.policy.status) && !result.policy.status) {
          result.fails++;
        }
      }
    } else {
      throw new Error("Functions not found");
    }

    return result;
  } catch (err) {
    return { fails: 1, error: err };
  }
};

export default { prep };
