import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Typography, Toolbar, IconButton } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core/styles";
import { ArrowDropDown } from "@material-ui/icons";
import toastr from "toastr";

import { RouteContext } from "../../../Context/RouteContext";
import ToggleButton from "../../../Inputs/Buttons/ToggleButton";
import AccountMenu from "./AccountMenu";
import routes, { LOGOUT, SETTING, HOME } from "../../../../routes/routes";
import DebugLinks from "./Menus/DebugLinks";
import { Debug } from "../../../../util/devvar/devvar";
import Searchbar from "../../../Inputs/Searchbar";
import Restful from "../../../../util/io/Restful";
import SearchOperator from "../../Tools/SearchOperator";

const styles = theme => {
  return {
    navBar: {
      backgroundColor: theme.palette.primary.hvr
    },
    toolbar: {
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "none"
    },
    navLinks: {
      display: "flex"
    },
    brandName: {
      fontSize: theme.typography.h4.fontSize,
      color: theme.palette.white
    },
    toggleButton: {
      marginRight: theme.spacing(2)
    }
  };
};

export class Header extends Component {
  constructor(props) {
    super(props);
    //TODO
    this.urls = {
      search: "TDB"
    };
    this.state = {
      _tag: this.constructor.name,
      showAccountMenu: false,
      showDebugMenu: false,
      searchResults: null,
      searchCurrently: null
    };
    this.menuRef = React.createRef();
    this.renderAccountMenu = this.renderAccountMenu.bind(this);
  }

  makeDebugMenuLinks(routes, classes) {
    if (!Debug.ACTIVE) {
      return null;
    }
    return (
      <div>
        <ToggleButton
          key="debugMenu"
          className={classes.toggleButton + " " + classes.debugObject}
          component={IconButton}
          scope={this}
          path={"showDebugMenu"}
          onClick={e => {
            this.menuRef = e.currentTarget;
          }}
        >
          <ArrowDropDown />
        </ToggleButton>
        {Boolean(this.state.showDebugMenu) ? (
          <DebugLinks
            links={routes}
            anchorRef={this.menuRef}
            close={() => {
              this.menuRef = null;
              this.setState({ showDebugMenu: false });
            }}
          />
        ) : null}
      </div>
    );
  }

  renderAccountMenu(routes, classes) {
    const accountMenu = {
      logout: _.find(routes, route => route.key === LOGOUT),
      setting: _.find(routes, route => route.key === SETTING)
    };
    return (
      <div>
        <ToggleButton
          key="accountMenu"
          edge="end"
          component={IconButton}
          className={classes.toggleButton}
          scope={this}
          path={"showAccountMenu"}
          onClick={e => {
            console.log(e);
            this.menuRef = e.currentTarget;
          }}
        >
          <ArrowDropDown />
        </ToggleButton>
        {Boolean(this.state.showAccountMenu) ? (
          <AccountMenu
            links={accountMenu}
            anchorRef={this.menuRef}
            close={() => {
              this.menuRef = null;
              this.setState({ showAccountMenu: false });
            }}
          />
        ) : null}
      </div>
    );
  }

  render() {
    const { account, classes } = this.props;
    const homeRoute = _.find(routes, route => route.key === HOME);

    return (
      <AppBar position="sticky" color="primary" className={this.state._tag + " " + classes.navBar}>
        <Toolbar className={classes.toolbar} variant="dense">
          <Typography className={classes.brandName} noWrap>
            Electr
          </Typography>
          <SearchOperator searchUrl={""} suggestionUrl={""} />
          <List component="nav" className={classes.navLinks}>
            <RouteContext.Consumer>
              {routes => {
                return (
                  <React.Fragment>
                    {this.makeDebugMenuLinks(routes.routes, classes)}
                    {this.renderAccountMenu(routes.routes, classes)}
                  </React.Fragment>
                );
              }}
            </RouteContext.Consumer>
          </List>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object,
  account: PropTypes.object,
  displayType: PropTypes.oneOf(["standard"])
};

export default withStyles(styles)(Header);
