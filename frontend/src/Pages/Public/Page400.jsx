import React, { Component } from "react";
//import PropTypes from 'prop-types';
//import func from '/frontend/src/util/func/func'

export class Page400 extends Component {
  constructor(props) {
    super(props);
    //var id=func.generateSerial(9,36);
    this.state = {
      _tag: this.constructor.name
      //_id: id
    };
    this._isMount = false;
  }

  componentDidMount() {
    this._isMount = true;
  }

  componentWillUnmount() {
    this._isMount = false;
  }

  render() {
    return <div className={this.state._tag}>{this.state._tag}</div>;
  }

  // static propTypes = {};

  // static defaultProps = {};
}
export default Page400;
