import { devvar } from "../devvar/devvar";
// import func from "../func/func";
import _ from "lodash";

export var get = (uri, safe = true) => {
  return fetch(devvar.DOMAIN + uri)
    .then(response => {
      if (response.status === 410) {
        return response.json().then(result => {
          return { status: response.status, ...result };
        });
      } else if (response.status !== 200) {
        return { status: response.status, message: "Unknown Failure" };
      }

      return response.json();
    })
    .catch(function(err) {
      if (!safe) {
        throw err;
      } else {
        console.log("Operational Error ", err);
      }
    });
};

export var getM = (uri, flatMap, safe = true) => {
  let message = "?";
  for (let key in flatMap) {
    if (!flatMap.hasOwnProperty(key)) continue;
    let value = flatMap[key];
    message += key + "=" + value + "&";
  }
  message = encodeURI(message.substring(0, message.length - 1));
  return fetch(devvar.DOMAIN + uri + message)
    .then(response => {
      if (response.status === 410) {
        return response.json().then(result => {
          return { status: response.status, ...result };
        });
      } else if (response.status !== 200) {
        return { status: response.status, message: "Unknown Failure" };
      }

      return response.json();
    })
    .catch(function(err) {
      if (!safe) {
        throw err;
      } else {
        console.log("Operational Error ", err);
      }
    });
};

export var post = (uri, message, responseData = true) => {
  let messageLength = _.isNil(message)
    ? 0
    : JSON.stringify(message).length.toString();
  var myHeaders = new Headers({
    "Content-Type": "application/json",
    "Content-Length": messageLength,
    Origin: "*"
  });

  return fetch(devvar.DOMAIN + uri, {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(message)
  })
    .then(function(response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return { status: response.status, message: response };
      }
      return response;
    })
    .then(function(data) {
      if (responseData) {
        return data.json();
      } else {
        return data;
      }
    });
};
export default (module.export = {
  get,
  getM,
  post
});
