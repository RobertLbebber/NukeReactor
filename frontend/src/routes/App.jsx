import React from "react";
import PropTypes from "prop-types";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { withStyles } from "@material-ui/core";

import { HeartbeatProvider } from "../Context/HeartbeatContext";
import Router from "./Router";
import { GlobalInputsProvider } from "../Context/GlobalInputsContext";
import { theme } from "../Context/ThemeContext";
import ComponentPlus from "../general/Util/ComponentPlus";

const styles = theme => {
  return {
    App: {}
  };
};

export class App extends ComponentPlus {
  constructor(props) {
    super(props);
    this.state = {
      _tag: this.constructor.name,
      locale: "en",
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
    let { classes } = this.props;
    return (
      <div className={classes.App}>
        <CssBaseline />
        <div className={this.state._tag}>
          <MuiThemeProvider theme={theme}>
            <GlobalInputsProvider>
              <HeartbeatProvider>
                <Router />
              </HeartbeatProvider>
            </GlobalInputsProvider>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }

  static propTypes = { classes: PropTypes.string };

  // static defaultProps = {};
}
export default withStyles(styles)(App);
