import _ from "lodash";
import { Validator, validate } from "jsonschema";
import { GET, POST, PUT, DELETE } from "../../io/ResponseStatus";

class StreamControl {
  constructor(name, controller) {
    //Essentials
    this._controller = controller;
    this._fn = undefined;
    this._rest = GET;
    this._name = name;
    this._path = name;
    //Rules
    this._policy = [];
    this._session = true;
    this._dynamicPath = [];
    this._schema = undefined;
    //Decoration
    this._description = undefined;
    this._contentType = "application/json";
    this._contentAccept = "application/json";
    //Environment
    this._debug = false;
  }

  static init = (name, controller) => {
    return new StreamControl(name, controller);
  };

  toJSON() {
    return {
      //Essentials
      fn: this._fn,
      rest: this._rest,
      name: this._name,
      path: this._path,
      //Rules
      policy: this._policy,
      schema: this._schema,
      session: this._session,
      dynamicPath: this._dynamicPath,
      //Decoration
      description: this._description,
      contentType: this._contentType,
      contentAccept: this._contentAccept,
      //Environment
      debug: this._debug,
    };
  }

  fn(value) {
    this._fn = value;
    return this.done();
  }

  path(value, prefix = false, suffix = false) {
    this._path = prefix ? value + this._path : value;
    this._path = suffix ? this._path + value : this._path;
    return this;
  }

  //Dynamic Paths
  dynamic(array) {
    this._dynamicPath = array;
    return this;
  }

  //Session
  open() {
    this._session = false;
    return this;
  }

  //Policy
  constraints(array) {
    this._policy = array;
    return this;
  }

  schema(value) {
    this._schema = event => {
      return new Validator().validate(event.body, value);
    };
    return this;
  }

  /**
   * @todo Not current implemented to limit or validate requests @see [routes.json.js]
   *
   * @param {String} value - Return Content Types (deliminated by ",")
   */
  contentType(value) {
    this._contentType = value;
    return this;
  }

  /**
   * @todo Not current implemented to limit or validate requests @see [routes.json.js]
   *
   * @param {String} value - Acceptible Content Types (deliminated by ",")
   */
  contentAccept(value) {
    this._contentAccept = value;
    return this;
  }

  rest(value) {
    this._rest = value;
    return this;
  }

  //Delete
  deleter() {
    this._rest = DELETE;
    return this;
  }

  put() {
    this._rest = PUT;
    return this;
  }
  get() {
    this._rest = GET;
    return this;
  }

  post() {
    this._rest = POST;
    return this;
  }

  debug() {
    this._debug = true;
    return this;
  }

  description() {
    this._description = true;
    return this;
  }

  done() {
    this._controller[this._name] = this.toJSON();
    if (_.isNil(this._controller[this._name].fn)) {
      throw new Error("StreamControl miss required Property: 'fn'");
    }
    return this._controller;
  }

  doneFn() {
    this._controller[this._name] = this.toJSON();
    return this._controller;
  }
}

export class GenericController {
  constructor() {}
  getName = () => this.constructor.name;
  /**
   * Opens up a Stream to create a endpoint
   *
   * @param {String} name - Name of the Endpoint
   */
  create = name => StreamControl.init(name, this);
}
