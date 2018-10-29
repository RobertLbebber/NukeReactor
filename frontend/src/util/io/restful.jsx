import { devvar } from "../devvar/devvar";
import func from "../func/func";
export var get = (uri, safe = true) => {
  return fetch(devvar.DOMAIN + uri)
    .then(response => {
      // console.log(response);
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return "Failed";
      }
      return response.json();
    })
    .catch(function(err) {
      if (!safe) {
        throw err;
      } else {
        console.log("Fetch Error ", err);
      }
    });
};

export var post = (uri, message, safe = true) => {
  console.log(message);
  var myHeaders = new Headers({
    "Content-Type": "application/json",
    "Content-Length": JSON.stringify(message).length.toString(),
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
      // console.log("post ", response);
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return "Failed";
      }
      return response;
    })
    .then(function(data) {
      return data.json();
    })
    .catch(function(err) {
      if (!safe) {
        throw err;
      } else {
        console.log("Fetch Error ", err);
      }
    });
};
export default (module.export = {
  get,
  post
});
