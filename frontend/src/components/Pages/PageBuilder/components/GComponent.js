// @flow

import errors from "../helpers/errors";

class GComponent {
  /**
   * Component type
   *
   * @type {string}
   */
  type: string;
  /**
   * Component events
   *
   * @type {Object}
   */
  events = {};

  /**
   * Component constructor
   * @param type {string}
   */
  constructor(type: string) {
    this.type = type;
  }

  /**
   * isComponent method
   *
   * This method requires implementation
   */
  isComponent: Function = () => {
    return errors.methodRequiresImplementation("isComponent");
  };

  /**
   * render method
   *
   * This method requires implementation
   */
  render: Function = () => {
    return errors.methodRequiresImplementation("render");
  };
}

export default GComponent;
