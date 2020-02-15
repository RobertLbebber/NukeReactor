import React, { Component } from "react";

export class Electr extends Component {
  constructor(props) {
    super(props);
    this._tag = this.constructor.name;
    this.state = {};
    this._mounted = false;
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return <div className={this.state._tag}>{this.state._tag}</div>;
  }

  // static propTypes = {};

  // static defaultProps = {};
}
export default Electr;
