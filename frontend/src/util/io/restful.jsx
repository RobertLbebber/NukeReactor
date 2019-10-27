import _ from "lodash";

import ResponseData from "./ResponseData";
import { Details } from "../../env/InterpretedEnvironment";

let bodyBuilder = (body, options) => {
  if (_.isNil(body) || body.constructor === String) {
    options.body = body;
    options.headers = {
      Accept: "text/plain",
      "Content-Type": "text/plain"
    };
  } else if (body.constructor === Object || body.constructor === Array) {
    options.body = JSON.stringify(body);
    options.headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
  }
  if (!_.isNil(navigator)) {
    options.headers = {
      ...options.headers,
      language: navigator.language,
      appVersion: navigator.appVersion,
      userAgent: navigator.userAgent,
      vendor: navigator.vendor,
      platform: navigator.platform
    };
  }
  return options;
};

const fetchResolve = async (uri, options, execution) => {
  try {
    let data;
    let response = await fetch(Details.DOMAIN + uri, options);
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

/**
 * This method is responsible for sending get requests to the server and returning a response
 *
 * @param {String} uri - Non-domain endpoint for the server
 * @returns {object} @property status - status code from the server
 *                   @property body - response information from the server
 */
export const get = (uri, options, execution) => {
  options = _.defaultsDeep(options, { method: "GET", credentials: "include" });

  return fetchResolve(uri, options, execution);
};

/**
 * This method is responsible for sending gest requests to the server and returning a response with a json object in URL
 *
 * @param {String} uri - Non-domain endpoint for the server
 * @param {{key:value}} flatMap - shallow flattens json to a url
 * @returns {object} @property status - status code from the server
 *                   @property body - response information from the server
 */
export const getWithQuery = (uri, flatMap, options, execution) => {
  let query = "?";
  for (let key in flatMap) {
    if (!_.isNil(flatMap[key])) continue;
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
export const post = async (uri, body, options, execution = "json") => {
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
export const put = async (uri, body, options, execution = "json") => {
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
export const deleter = async (uri, body, options, execution = "json") => {
  options = _.defaultsDeep(options, { method: "DELETE", credentials: "include" });
  options = bodyBuilder(body, options);

  return await fetchResolve(uri, options, execution);
};

export default {
  get,
  getWithQuery,
  post,
  put,
  deleter
};
