import React, { Component } from "react";
import { Glyphicon } from "react-bootstrap";
import PropTypes from "prop-types";
// import _ from "lodash";

export class ECrown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _tag: this.constructor.name
    };
  }

  render() {
    // let marginTop = !_.isNil(this.props.marginTop)
    //   ? this.props.marginTop
    //   : this.props.fontSize / 6 + this.props.fontUnit;
    return (
      <div className={this.state._tag}>
        {/* style={{ marginTop: marginTop }} */}
        <Glyphicon
          glyph="tower"
          style={{
            fontSize: this.props.fontSize / 6 + this.props.fontUnit,
            top: this.props.fontSize * -0.9333 + this.props.fontUnit,
            right: this.props.fontSize / -1.8018 + this.props.fontUnit,
            transform: "scale(2, 1)",
            color: this.props.color
          }}
        />
        <Glyphicon
          glyph="gbp"
          style={{
            fontSize: this.props.fontSize + this.props.fontUnit,
            color: this.props.color,
            transform: "rotateX(180deg)"
          }}
        />
      </div>
    );
  }
  static propTypes = {
    fontSize: PropTypes.number,
    fontUnit: PropTypes.string,
    // marginTop: PropTypes.number,
    color: PropTypes.string
  };

  static defaultProps = {
    fontSize: 14,
    fontUnit: "px",
    color: "black"
  };
}
export default ECrown;
