import { devvar } from "../devvar/devvar";
// import func from "../func/func";
import _ from "lodash";

/**
 * This method is responsible for sending get requests to the server and returning a response
 *
 * @param {String} uri - Non-domain endpoint for the server
 * @returns {object} @property status - status code from the server
 *                   @property body - response information from the server
 */
export var get = uri => {
  return fetch(devvar.DOMAIN + uri, {
    credentials: "include"
  })
    .then(async response => {
      return { status: response.status, body: await response.json() };
    })
    .then(response => {
      if (response.status === 415) {
        return { status: response.status, body: "Unknown Error" };
      }
      return { status: response.status, body: response.body };
    });
};

/**
 * This method is responsible for sending gest requests to the server and returning a response with a json object in URL
 *
 * @param {String} uri - Non-domain endpoint for the server
 * @param {String} flatMap - shallow flattens json to a url
 * @returns {object} @property status - status code from the server
 *                   @property body - response information from the server
 */
export var getM = (uri, flatMap) => {
  let message = "?";
  for (let key in flatMap) {
    if (!flatMap.hasOwnProperty(key)) continue;
    let value = flatMap[key];
    message += key + "=" + value + "&";
  }
  message = encodeURI(message.substring(0, message.length - 1));
  return fetch(devvar.DOMAIN + uri + message)
    .then(async response => {
      return await response.json();
    })
    .then(response => {
      if (response.status === 410) {
        return { status: response.status, body: response };
      } else if (response.status !== 200) {
        return { status: response.status, message: "Unknown Failure" };
      }
      return { status: response.status, body: response };
    });
};

/**
 * This method is responsible for sending post requests to the server and returning a response
 *
 * @param {String} uri - Non-domain endpoint for the server
 * @param {String} message - Information to be sent to the server
 * @returns {object} @property status - status code from the server
 *                   @property body - response information from the server
 */
export var post = (uri, message) => {
  return fetch(devvar.DOMAIN + uri, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(message)
  })
    .then(async response => {
      return { status: response.status, body: await response.json() };
    })
    .then(response => {
      if (response.status === 415) {
        return { status: response.status, body: "Unknown Error" };
      }
      return { status: response.status, body: response.body };
    });
};
export default (module.export = {
  get,
  getM,
  post
});
