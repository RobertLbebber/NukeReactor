import React, { Component } from "react";

import { HeartbeatProvider } from "../components/Context/HeartbeatContext";
import { Routes } from "./Routes.jsx";
import { GlobalInputsProvider } from "../components/Context/GlobalInputsContext";
import { theme } from "../components/Context/ThemeContext";
import { MuiThemeProvider } from "@material-ui/core";

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
        <MuiThemeProvider theme={theme}>
          <GlobalInputsProvider>
            <HeartbeatProvider>
              <Routes />
            </HeartbeatProvider>
          </GlobalInputsProvider>
        </MuiThemeProvider>
      </div>
    );
  }

  // static propTypes = {};

  // static defaultProps = {};
}
export default Index;
