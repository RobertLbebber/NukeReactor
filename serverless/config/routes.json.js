let routes = {
  functions: {
    create: {
      handler: "oper/todos/create.create",
      events: [
        {
          http: {
            path: "todos",
            method: "post",
            cors: true
          }
        }
      ]
    },
    list: {
      handler: "oper/todos/list.list",
      events: [
        {
          http: {
            path: "todos",
            method: "get",
            cors: true
          }
        }
      ]
    },
    get: {
      handler: "oper/todos/get.get",
      events: [
        {
          http: {
            path: "todos/{id}",
            method: "get",
            cors: true
          }
        }
      ]
    },
    update: {
      handler: "oper/todos/update.update",
      events: [
        {
          http: {
            path: "todos/{id}",
            method: "put",
            cors: true
          }
        }
      ]
    },
    delete: {
      handler: "oper/todos/delete.delete",
      events: [
        {
          http: {
            path: "oper/todos/{id}",
            method: "delete",
            cors: true
          }
        }
      ]
    }
  }
};

export default routes;
