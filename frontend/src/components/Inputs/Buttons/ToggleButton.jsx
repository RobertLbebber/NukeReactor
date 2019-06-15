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
    if (
      _(this.props.scope)
        .chain()
        .get(this.state.path)
        .isNil()
        .value() &&
      _.isNil(this.state.active)
    ) {
      throw new Error("Path of scope was not provided correct, button will fail to change state. ");
    }
    return (
      <Button
        className={this._tag + " " + this.props.className}
        {...this.props}
        onClick={() => {
          let localPath = this.props.path;
          this.props.scope.setState(prevState => {
            let safeState = _.cloneDeep(prevState);
            let value = _.get(safeState, localPath);
            return _.set(prevState, localPath, !value);
          });
        }}
      >
        {this.props.children}
      </Button>
    );
  }

  static propTypes = {
    className: PropTypes.string,
    active: PropTypes.bool,
    scope: PropTypes.object,
    path: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  };

  static defaultProps = {
    className: ""
  };
}
export default ToggleButton;
