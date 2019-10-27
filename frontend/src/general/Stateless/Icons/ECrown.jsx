import React, { Component } from "react";
import { FaPoundSign, FaCrown } from "react-icons/fa";
import PropTypes from "prop-types";

export class ECrown extends Component {
  constructor(props) {
    super(props);
    this._tag = this.constructor.name;
  }

  render() {
    return (
      <div className={this._tag}>
        <FaCrown
          style={{
            position: "fixed",
            fontSize: this.props.fontSize * 0.2 + this.props.fontUnit,
            transform: "scale(2, 1)",
            color: this.props.color,
            marginLeft: "2em",
            marginTop: "-1em"
          }}
        />
        <FaPoundSign
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
    color: PropTypes.string
  };

  static defaultProps = {
    fontSize: 14,
    fontUnit: "px",
    color: "black"
  };
}
export default ECrown;
