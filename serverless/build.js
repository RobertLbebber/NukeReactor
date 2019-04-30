import fs from "graceful-fs";
import { dump } from "node-yaml";
import routes from "./config/routes.json";
import server from "./config/server.json";
import db from "./config/db.json";
import custom from "./config/custom.json";
import provider from "./config/provider.json";

let full = {
  ...server,
  ...custom,
  ...routes,
  ...provider,
  ...db
};

const target = "serverless.yml";
const verbose = false;

async function appender(jsonYaml, name) {
  console.log(JSON.stringify(jsonYaml));
  // let data = dump(jsonYaml);
  await new Promise(resolve =>
    fs.appendFile(target, JSON.stringify(), async function(err) {
      if (err) throw err;
      if (verbose) {
        console.log(name + " Saved!");
      }
      resolve();
    })
  );
}

async function runner() {
  //Creating Server Section
  let data = dump(full);
  await new Promise(resolve =>
    fs.writeFile(target, data, err => {
      if (err) throw err;
      if (verbose) {
        console.log("The file has been created!");
      }
      resolve();
    })
  );

  if (verbose) {
    console.log("The file has been completed!");
  }
}
runner();
