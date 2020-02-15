import React from "react";
// import PropTypes from "prop-types";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";

import Routing from "./Routing";
import { LocaleProvider } from "Context/LocaleContext";
import { theme } from "Context/ThemeContext";
import ComponentPlus from "general/Util/ComponentPlus";
import HeartbeatProvider from "Context/Heartbeat/HeartbeatContext";

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
                <Routing />
              </HeartbeatProvider>
            </LocaleProvider>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}
export default App;
