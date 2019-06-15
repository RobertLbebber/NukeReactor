import _ from "lodash";
import { GET } from "../../io/ResponseStatus";
import { SERVICE_NAME, DEVELOPMENT, PRODUCTION } from "../../config/constants";
import env from "../../config/env";

export const lamdbaHandler = (controller, name, path, session = true, rest = GET, debug = false, other) => fn => {
  controller[name] = { fn, path, session, rest, debug, ...other };
};

export const handlerExporter = controller => {
  let ends = {};
  for (let endpointName in controller) {
    let endpoint = controller[endpointName];
    if (_.isObject(endpoint) && !_.isNil(endpoint)) {
      ends[endpointName] = endpoint.fn;
    }
  }
  return ends;
};

export const functionName = (fullName, tag) => {
  let serviceName = env.mode === DEVELOPMENT ? DEVELOPMENT : PRODUCTION;
  console.log(SERVICE_NAME + "-" + serviceName, fullName);
  return fullName.replace(SERVICE_NAME + "-" + serviceName + "-" + tag + "-", "");
};

export default { genFn: lamdbaHandler, expFn: handlerExporter, baseFnName: functionName };
