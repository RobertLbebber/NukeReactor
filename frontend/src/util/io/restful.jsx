import { devvar } from "../devvar/devvar";
export var get = uri => {
  return fetch(devvar.DOMAIN + uri)
    .then(function(response) {
      // console.log(response);
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return "Failed";
      }
      // console.log("get", response);
      return response;
    })
    .then(function(data) {
      return data.json();
    })
    .catch(function(err) {
      console.log("Fetch Error ", err);
    });
};

export var post = (uri, message) => {
  var myHeaders = new Headers({
    "Content-Type": "application/json",
    "Content-Length": message.length.toString(),
    Origin: "*"
  });

  return fetch(devvar.DOMAIN + uri, {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default"
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
      console.log("Fetch Error ", err);
    });
};
export default (module.export = {
  get,
  post
});
