"use strict";
const fs = require("graceful-fs");
const _ = require("lodash");

const showFileCreation = false;
const showFolderCreation = false;
// module.exports = {
export async function mkDir(path) {
  if (!fs.existsSync(path)) {
    await fs.mkdir(path, { recursive: true }, err => {
      if (err) throw err;
      if (showFolderCreation) {
        console.log("The Folder has been created: " + path);
      }
    });
  }
}

export async function mkFile(path, content) {
  await fs.writeFile(path, content, "utf8", async (err, data) => {
    if (err) throw err;
    if (showFileCreation) {
      console.log("File supposedly Created: " + path);
    }
  });
}
// };
