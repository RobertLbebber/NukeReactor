import _ from "lodash";
import Policy from "./Policy";
import Session from "./Session";
import GenerateHandler from "../endpoints/common/GenerateHandler";

export const prep = async (event, context, rules) => {
  try {
    let result = { fails: 0, messages: [] };
    let shortName = GenerateHandler.baseFnName(context.functionName, rules.tag);
    let currentRules = rules[shortName];

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
    } else {
      throw new Error("Functions not found");
    }

    return result;
  } catch (error) {
    return { fails: 1, error };
  }
};

export default { prep };
