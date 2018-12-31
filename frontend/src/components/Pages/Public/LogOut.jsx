import React, { Component } from "react";
import PropTypes from "prop-types";
//import _ from 'lodash'
//import func from '/frontend/src/util/func/func'

export class LogOut extends Component {
  constructor(props) {
    super(props);
    this._isMount = false;
  }

  componentDidMount() {
    this.props.logOutFn();
    this._isMount = true;
  }

  componentWillUnmount() {
    this._isMount = false;
  }

  render() {
    return null;
  }

  static propTypes = {
    logOutFn: PropTypes.func.isRequired
  };

  // static defaultProps = {};
}
export default LogOut;
