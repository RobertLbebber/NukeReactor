import _ from "lodash";
import Policy from "./Policy";
import Session from "./Session";
import ResponseStatus from "../io/ResponseStatus";

export const prep = (event, context, rules) => {
  try {
    let result = { fails: 0 };

    console.log(context.function_name);
    let currentRules = rules[context.function_name];

    console.log(currentRules);
    if (!_.isNil(currentRules)) {
      //Handle Sessions
      if (currentRules.session) {
        result.session = Session.handleSession(event, currentRules);
        if (!_.isNil(result.session.status) && !result.session.status) {
          result.fails++;
        }
      }

      //Handle Policies
      if (!_.isNil(currentRules.policies) && currentRules.policies.length > 0) {
        result.policy = Policy.handlerPolicies(currentRules);
        if (!_.isNil(result.policy.status) && !result.policy.status) {
          result.fails++;
        }
      }
    }

    return result;
  } catch (error) {
    return { fails: 1, error: error };
  }
};

export default { prep };
