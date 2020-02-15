import React from "react";
// import PropTypes from "prop-types";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";

import HeartbeatProvider from "../Context/Heartbeat/HeartbeatContext";
import Router from "./Router";
import { LocaleProvider } from "Context/LocaleContext";
import { theme } from "Context/ThemeContext";
import ComponentPlus from "general/Util/ComponentPlus";

export class App extends ComponentPlus {
  constructor(props) {
    super(props);
    this.state = {
      _tag: this.constructor.name,
      isOpen: false,
    };
  }

  render() {
    // let { classes } = this.props;
    return (
      <div>
        <CssBaseline />
        <div className={this.state._tag}>
          <MuiThemeProvider theme={theme}>
            <LocaleProvider>
              <HeartbeatProvider>
                <Router />
              </HeartbeatProvider>
            </LocaleProvider>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}
export default App;
