import _ from "lodash";
import { GET, POST, PUT, DELETE } from "../../io/ResponseStatus";

class StreamControl {
  constructor(name, controller) {
    this._controller = controller;
    this._fn = undefined;
    this._name = name;
    this._path = name;
    this._debug = false;
    this._session = true;
    this._description = undefined;
    this._rest = GET;
  }

  static init = (name, controller) => {
    return new StreamControl(name, controller);
  };

  toJSON() {
    return {
      fn: this._fn,
      name: this._name,
      path: this._path,
      debug: this._debug,
      session: this._session,
      description: this._description,
      rest: this._rest
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

  open() {
    this._session = false;
    return this;
  }

  rest(value) {
    this._rest = value;
    return this;
  }

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
}

export class GenericController {
  constructor() {}
  getName = () => this.constructor.name;
  create = name => StreamControl.init(name, this);
}
