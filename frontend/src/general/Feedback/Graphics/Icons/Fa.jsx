import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

/**
 *  TODO Documentation
 */

export class Fa extends Component {
  constructor(props) {
    super(props);
    this._tag = this.constructor.name;
    this._mounted = false;
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  size(size) {
    if (size.length == 0) {
      return "";
    }
    switch (size) {
      case "xs":
        size = " fa-lg";
        break;
      case "sm":
        size = " fa-2x";
        break;
      case "md":
        size = " fa-3x";
        break;
      case "lg":
        size = " fa-4x";
        break;
      case "xl":
        size = " fa-5x";
        break;
      case "fixed":
        size = " fa-fw";
        break;
      default:
        console.warn("Invalid Size Given");
    }
    return size;
  }

  rotation(rotate) {
    if (rotate.length == 0) {
      return "";
    }
    switch (rotate) {
      case "90":
      case "180":
      case "270":
        rotate = " fa-rotate-" + rotate;
      case "x":
        rotate = " fa-flip-horizontal";
        break;
      case "y":
        rotate = " fa-flip-vertical";
        break;
      default:
        console.warn("Invalid Rotate Given");
    }
    return rotate;
  }

  animation(simpleAnimation) {
    if (simpleAnimation.length == 0) {
      return "";
    }
    if (simpleAnimation === true) {
      return "fa-spin";
    }
    switch (simpleAnimation) {
      case "spin":
      case "pulse":
        simpleAnimation = " fa-" + simpleAnimation;
        break;
      default:
        console.warn("Invalid Animation Given");
    }
    return simpleAnimation;
  }

  render() {
    let size = this.size(this.props.size);
    let rotate = this.rotation(this.props.rotate);
    let simpleAnimation = this.animation(this.props.simpleAnimation);
    return (
      <i
        className={this._tag + " " + this.props.className + " fa fa-" + this.props.fa + size + rotate + simpleAnimation}
      >
        {this.state._tag}
      </i>
    );
  }
}
Fa.propTypes = {
  className: PropTypes.string,
  fa: PropTypes.string.isRequired,
  rotate: PropTypes.oneOf(["90", "180", "270", "x", "y", ""]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "fixed", ""]),
  simpleAnimation: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(["spin", "pulse", ""])])
};

Fa.defaultProps = {
  className: "",
  fa: "chess-board",
  rotate: "",
  size: "",
  simpleAnimation: ""
};
export default Fa;
