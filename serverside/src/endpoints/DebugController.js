import { Models as RawModels } from "../db/models/_export.json";
import ResponseStatus, { POST, GET, DELETE } from "../io/ResponseStatus";
import GenerateHandler from "./common/GenerateHandler";
import { GenericController } from "./common/GenericController.js";
import env, { DEVELOPMENT } from "../config/env.js";

const postGets = {
  get: {
    method: GET,
    crud: (event, fn) => {
      return fn(event.Key, event.other);
    }
  },
  query: {
    method: POST,
    crud: (event, fn) => {
      return fn(event.Item, event.other);
    }
  },
  create: {
    method: POST,
    crud: (event, fn) => {
      return fn(event.Item, event.other);
    }
  },
  crement: {
    method: GET,
    crud: (event, fn) => {
      return fn(event.Key, event.other);
    }
  },
  update: {
    method: POST,
    crud: (event, fn) => {
      return fn(event.Key, event.Item, event.other);
    }
  },
  createUpdate: {
    method: POST,
    crud: (event, fn) => {
      return fn(event.Item, event.other);
    }
  },
  remove: {
    method: DELETE,
    crud: (event, fn) => {
      return fn(event.Item, event.other);
    }
  },
  scan: {
    method: GET,
    crud: (event, fn) => {
      return fn();
    }
  }
};

class DebugController extends GenericController {}
let init = new DebugController();

let endpoints = {};
let controllers = {};
for (let controllerName in RawModels) {
  let functions = RawModels[controllerName].func;
  for (let funcName in functions) {
    let publicFuncName = controllerName + "_" + funcName;
    GenerateHandler.genFn(
      init,
      publicFuncName,
      "/" + controllerName + "/debug/" + funcName,
      false,
      postGets[funcName].method
    )((event, context, callback) => {
      let result = postGets[funcName].crud(event, funcName[funcName]);
      return ResponseStatus(true, result, 300);
    });
    controllers[publicFuncName] = init[publicFuncName];
  }
  endpoints = { ...endpoints, ...GenerateHandler.expFn(init) };
}

module.exports = env.mode === DEVELOPMENT ? { ...endpoints, DebugController: controllers } : {};
