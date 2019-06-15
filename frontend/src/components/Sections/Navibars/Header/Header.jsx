import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import _ from "lodash";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { RouteContext } from "../../../Context/RouteContext";
import ECrown from "../../../Util/Icons/ECrown";
import { Typography, Toolbar } from "@material-ui/core";

const styles = theme => {
  console.log(theme);
  return {
    text: {
      paddingTop: theme.spacing.unit * 0,
      paddingLeft: theme.spacing.unit * 0,
      paddingRight: theme.spacing.unit * 0
    },
    navBar: {
      backgroundColor: theme.palette.primary.hvr,
      top: "auto",
      bottom: 0
    },
    toolbar: {
      alignItems: "center",
      justifyContent: "space-between"
    },
    navLinks: {
      display: "flex"
    },
    brandName: {
      fontSize: theme.typography.display1.fontSize,
      color: theme.palette.white
    }
  };
};

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _tag: this.constructor.name
    };
  }
  render() {
    const { account, classes } = this.props;

    return (
      <AppBar position="static" color="primary" className={this.state._tag + " " + classes.navBar}>
        <Toolbar>
          <Typography className={classes.brandName} noWrap>
            {this.state.showThinBar ? <ECrown fontSize={55} /> : "Electr"}
          </Typography>
          <List component="nav" className={classes.navLinks}>
            <RouteContext.Consumer>
              {routes => {
                return (
                  routes.routesInfo &&
                  routes.routesInfo.map(route => (
                    <ListItem
                      button
                      key={route.name}
                      component={Link}
                      to={route.dynamic && !_.isNil(account) ? route.path + account.id : route.path}
                    >
                      <ListItemIcon>{route.iconComponent}</ListItemIcon>
                      <ListItemText primary={route.name} />
                    </ListItem>
                  ))
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
