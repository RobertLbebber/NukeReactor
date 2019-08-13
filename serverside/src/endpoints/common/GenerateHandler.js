import _ from "lodash";
import { GET } from "../../io/ResponseStatus";
import env, { SERVICE_NAME, DEVELOPMENT, PRODUCTION } from "../../config/env";

//genFn
export const lamdbaHandler = (
  controller,
  name,
  path = name,
  session = true,
  rest = GET,
  debug = false,
  other
) => fn => {
  controller[name] = { fn, path, session, rest, debug, ...other };
};

//expFn
export const handlerExporter = controller => {
  let ends = {};
  for (let endpointName in controller) {
    // let controllerName = controller.getName();
    let endpoint = controller[endpointName];
    if (_.isObject(endpoint) && !_.isNil(endpoint)) {
      ends[endpointName] = endpoint.fn;
    }
  }
  return ends;
};

//baseFnName
export const functionName = (fullName, controllerName) => {
  let serviceName = env.mode === DEVELOPMENT ? DEVELOPMENT : PRODUCTION;
  return fullName.replace(SERVICE_NAME + "-" + serviceName + "-" + controllerName + "-", "");
};

export default { genFn: lamdbaHandler, expFn: handlerExporter, baseFnName: functionName };
