import _ from "lodash";
import fs from "graceful-fs";

import en from "./lang/en.json";

import { flatten } from "../../util/func/jsonUtil";

let Lang = { en };
function runner() {
  _.map(Lang, async (language, key) => {
    let data = flatten(language);
    console.log(JSON.stringify(data));
    await new Promise(resolve =>
      fs.writeFile(`./src/assets/locale/flatten/${key}.json`, JSON.stringify(data), err => {
        if (err) throw err;
        console.log("The file has been created!");
        resolve();
      })
    );
  });
}
runner();
