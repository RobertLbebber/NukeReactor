import * as Controllers from "../endpoints/_export";
import _ from "lodash";

function routeBuilder() {
  let functions = {};
  for (let controllerName in Controllers) {
    let controller = Controllers[controllerName];
    for (let handlerName in controller[controllerName]) {
      let handlerGroup = controller[controllerName][handlerName];
      if (handlerGroup.constructor != Object) {
        continue;
      }
      let handlerPathName = controllerName + "-" + handlerName;
      functions[handlerPathName] = {};
      functions[handlerPathName].handler = "dist/endpoints/" + controllerName + "." + handlerName;
      let http = {
        path: handlerGroup.path,
        method: _.toLower(handlerGroup.rest)
      };
      for (let key in http) {
        if (_.isNil(http[key])) {
          delete http[key];
        }
      }
      if (!_.isEmpty(http)) {
        //http.//cors = true;
        functions[handlerPathName].events = [{ http }];
      }
    }
  }
  return functions;
}

let routes = {
  functions: {
    ...routeBuilder()
    //   create: {
    //     handler: "oper/todos/create.create",
    //     events: [
    //       {
    //         http: {
    //           path: "todos",
    //           method: "post"
    //           //cors: true
    //         }
    //       }
    //     ]
    //   },
    //   list: {
    //     handler: "oper/todos/list.list",
    //     events: [
    //       {
    //         http: {
    //           path: "todos",
    //           method: "get"
    //           //cors: true
    //         }
    //       }
    //     ]
    //   },
    //   get: {
    //     handler: "oper/todos/get.get",
    //     events: [
    //       {
    //         http: {
    //           path: "todos/{id}",
    //           method: "get"
    //           //cors: true
    //         }
    //       }
    //     ]
    //   },
    //   update: {
    //     handler: "oper/todos/update.update",
    //     events: [
    //       {
    //         http: {
    //           path: "todos/{id}",
    //           method: "put"
    //           //cors: true
    //         }
    //       }
    //     ]
    //   },
    //   delete: {
    //     handler: "oper/todos/delete.delete",
    //     events: [
    //       {
    //         http: {
    //           path: "oper/todos/{id}",
    //           method: "delete"
    //           //cors: true
    //         }
    //       }
    //     ]
    //   }
  }
};

export default routes;
