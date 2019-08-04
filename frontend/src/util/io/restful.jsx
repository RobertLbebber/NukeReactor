import { devvar } from "../devvar/devvar";
import _ from "lodash";

import ResponseData from "./ResponseData";

/**
 * This method is responsible for sending get requests to the server and returning a response
 *
 * @param {String} uri - Non-domain endpoint for the server
 * @returns {object} @property status - status code from the server
 *                   @property body - response information from the server
 */
export var get = (uri, options, execution) => {
  options = _.defaultsDeep(options, { method: "GET", credentials: "include" });

  return fetchResolve(uri, options, execution);
};

/**
 * This method is responsible for sending gest requests to the server and returning a response with a json object in URL
 *
 * @param {String} uri - Non-domain endpoint for the server
 * @param {String} flatMap - shallow flattens json to a url
 * @returns {object} @property status - status code from the server
 *                   @property body - response information from the server
 */
export var getWithQuery = (uri, flatMap, options, execution) => {
  let query = "?";
  for (let key in flatMap) {
    if (!flatMap.hasOwnProperty(key)) continue;
    let value = flatMap[key];
    query += key + "=" + value + "&";
  }
  query = encodeURI(query.substring(0, query.length - 1));

  return get(uri + query, options, execution);
};

/**
 * This method is responsible for sending post requests to the server and returning a response
 *
 * @param {String} uri - Non-domain endpoint for the server
 * @param {String} body - Information to be sent to the server
 * @param {String} execution - Response Callback to interpret the response stream
 * @returns {object} @property status - status code from the server
 *                   @property body - response information from the server
 */
export let post = async (uri, body, options, execution = "json") => {
  options = _.defaultsDeep(options, { method: "POST", credentials: "include" });
  options = bodyBuilder(body, options);

  return await fetchResolve(uri, options, execution);
};

/**
 * This method is responsible for sending post requests to the server and returning a response
 *
 * @param {String} uri - Non-domain endpoint for the server
 * @param {String} body - Information to be sent to the server
 * @param {String} execution - Response Callback to interpret the response stream
 * @returns {object} @property status - status code from the server
 *                   @property body - response information from the server
 */
export let put = async (uri, body, options, execution = "json") => {
  options = _.defaultsDeep(options, { method: "PUT", credentials: "include" });
  options = bodyBuilder(body, options);

  return await fetchResolve(uri, options, execution);
};

/**
 * This method is responsible for sending post requests to the server and returning a response
 *
 * @param {String} uri - Non-domain endpoint for the server
 * @param {String} body - Information to be sent to the server
 * @param {String} execution - Response Callback to interpret the response stream
 * @returns {object} @property status - status code from the server
 *                   @property body - response information from the server
 */
export let deleter = async (uri, body, options, execution = "json") => {
  options = _.defaultsDeep(options, { method: "DELETE", credentials: "include" });
  options = bodyBuilder(body, options);

  return await fetchResolve(uri, options, execution);
};

let bodyBuilder = (body, options) => {
  if (body.constructor === String) {
    options.body = body;
    options.headers = {
      Accept: "text/plain",
      "Content-Type": "text/plain"
    };
  } else if (body.constructor === Object) {
    options.body = JSON.stringify(body);
    options.headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
  }
  return options;
};

const fetchResolve = async (uri, options, execution) => {
  try {
    let data;
    let response = await fetch(devvar.DOMAIN + uri, options);
    if (execution.constructor === String) {
      data = await response[execution];
    } else if (execution.constructor === Function) {
      data = await execution(response);
    }
    return new ResponseData(response.ok, response.status, data);
  } catch (err) {
    return new ResponseData(false, NaN, null);
  }
};

export default (module.export = {
  get,
  getWithQuery,
  post
});
