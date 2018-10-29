import React, { Component } from "react";
//import PropTypes from 'prop-types';
import func from "../../../util/func/func";

export class Electr extends Component {
  constructor(props) {
    super(props);
    var id = func.generateSerial(9, 36);
    this.state = {
      _tag: this.constructor.name,
      _id: id
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return <div className={this.state._tag}>{this.state._tag}</div>;
  }

  // static propTypes = {};

  // static defaultProps = {};
}
export default Electr;
