import { Component } from "react";
import _ from "lodash";

export default class ComponentPlus extends Component {
  _safeState(param1, cb) {
    this.setState(param1, cb);
  }
  _class() {
    return this.constructor.name();
  }
  _kebab() {
    return _.kebabCase(this._class());
  }
}
