import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

export class ToggleButton extends Component {
  constructor(props) {
    super(props);
    let safeProps = _.cloneDeep(props.path);
    if (props.path.constructor == Array) {
      safeProps.unshift("state");
    } else {
      safeProps = "state." + safeProps;
    }
    this.state = {
      active: props.active,
      path: safeProps
    };
    this._tag = this.constructor.name;
  }

  render() {
    const { children, className, component, scope, onClick, path } = this.props;
    if (
      _(scope)
        .chain()
        .get(this.state.path)
        .isNil()
        .value() &&
      _.isNil(this.state.active)
    ) {
      throw new Error("Path of scope was not provided correct, button will fail to change state. ");
    }
    let ProxyComponent = component;
    return (
      <ProxyComponent
        className={this._tag + " " + className}
        {...this.props}
        onClick={e => {
          let localPath = path;
          scope.setState(prevState => {
            let safeState = _.cloneDeep(prevState);
            let value = _.get(safeState, localPath);
            return _.set(prevState, localPath, !value);
          });
          onClick(e);
        }}
      >
        {children}
      </ProxyComponent>
    );
  }

  static propTypes = {
    className: PropTypes.string,
    active: PropTypes.bool,
    scope: PropTypes.object,
    path: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  };

  static defaultProps = {
    className: "",
    component: Button
  };
}
export default ToggleButton;
