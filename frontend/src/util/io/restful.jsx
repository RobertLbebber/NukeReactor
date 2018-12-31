import { devvar } from "../devvar/devvar";
// import func from "../func/func";
import _ from "lodash";

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
 *
 * @param {*} uri
 * @param {*} message
 * @param {*} responseData true if expecting data rather than a status
 */
export var post = (uri, message, responseData = true, safe = true) => {
  let messageLength = _.isNil(message)
    ? 0
    : JSON.stringify(message).length.toString();
  // var myHeaders = new Headers({
  //   "Content-Type": "application/json",

  //   "Content-Length": messageLength,
  //   Origin: "*"
  // });

  return fetch(devvar.DOMAIN + uri, {
    method: "POST",
    // headers: myHeaders,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    // mode: "cors",
    // cache: "default",
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
