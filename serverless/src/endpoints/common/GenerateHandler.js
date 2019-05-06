import _ from "lodash";
import { GET } from "../../io/ResponseStatus";

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

export default { genFn: lamdbaHandler, expFn: handlerExporter };
