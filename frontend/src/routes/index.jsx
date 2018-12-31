import React, { Component } from "react";

import {
  HeartbeatContext,
  HeartbeatProvider
} from "../components/Context/HeartbeatContext";
import { Routes } from "./Routes";
import "./Index.css";

export class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _tag: this.constructor.name,
      isOpen: false
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
    return (
      <div className={this.state._tag}>
        <HeartbeatProvider>
          <Routes />
        </HeartbeatProvider>
      </div>
    );
  }

  // static propTypes = {};

  // static defaultProps = {};
}
export default Index;
