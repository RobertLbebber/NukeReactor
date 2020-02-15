import React, { Component } from "react";
//import PropTypes from 'prop-types';
import func from "../../../util/func/func";

export class Electee extends Component {
  constructor(props) {
    super(props);
    var id = func.generateSerial(9, 36);
    this.state = {
      _tag: this.constructor.name,
      _id: id
    };
    this._mounteded = false;
  }

  componentDidMount() {
    this._mounteded = true;
  }

  componentWillUnmount() {
    this._mounteded = false;
  }

  render() {
    return <div className={this.state._tag}>{this.state._tag}</div>;
  }

  // static propTypes = {};

  // static defaultProps = {};
}
export default Electee;
