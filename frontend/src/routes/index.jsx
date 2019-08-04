import React, { Component } from "react";

import { HeartbeatProvider } from "../components/Context/HeartbeatContext";
import { Routes } from "./Routes.jsx";
import { GlobalInputsProvider } from "../components/Context/GlobalInputsContext";
import { theme } from "../components/Context/ThemeContext";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";

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
      <React.Fragment>
        <CssBaseline />
        <div className={this.state._tag}>
          <MuiThemeProvider theme={theme}>
            <GlobalInputsProvider>
              <HeartbeatProvider>
                <Routes />
              </HeartbeatProvider>
            </GlobalInputsProvider>
          </MuiThemeProvider>
        </div>
      </React.Fragment>
    );
  }

  // static propTypes = {};

  // static defaultProps = {};
}
export default Index;
