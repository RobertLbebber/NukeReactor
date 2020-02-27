import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Typography, Toolbar, IconButton, Avatar, Grid, Link } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import { ArrowDropDown } from "@material-ui/icons";
import { FormattedMessage } from "react-intl";
import NotificationMockData from "assets/data/NotificationMockData";

import {
  Combobox,
  Dropdown,
  GlobalHeader,
  GlobalHeaderFavorites,
  GlobalHeaderHelp,
  GlobalHeaderNotifications,
  GlobalHeaderProfile,
  GlobalHeaderSearch,
  GlobalHeaderSetup,
  GlobalHeaderTask,
  IconSettings,
  Popover,
} from "react-lds";
import { RouteContext } from "Context/RouteContext";

import AccountMenu from "Pages/Navibars/Header/Menus/AccountMenu";
import { LOGOUT, SETTING, HOME, ACCOUNT } from "Pages/_common/main/Routes";
import DebugLinks from "Pages/Navibars/Header/Menus/DebugLinks";
// import Restful from "util/io/Restful";

import { State } from "env/InterpretedEnvironment";
import { AccountShape } from "Context/Heartbeat/HeartbeatContext";
import { getProfileImage } from "util/io/UserAPIs";
import { prettyNumber } from "util/func/lodashExtension";

// import SearchOperator from "general/Inputs/Form/Tools/SearchOperator";

const styles = theme => {
  return {
    navBar: {
      backgroundColor: theme.palette.primary.hvr,
      boxShadow: "none",
      // marginBottom: theme.spacing(1),
    },
    toolbar: {
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "none",
    },
    navLinks: {
      display: "flex",
    },
    brandName: {
      fontSize: theme.typography.h4.fontSize,
      color: theme.palette.white,
    },
    toggleButton: {
      marginRight: theme.spacing(2),
    },
    profileAvatar: {
      backgroundColor: "lightgray",
    },
    menu: {
      top: "35px !important",
    },
  };
};

class Header extends Component {
  constructor(props) {
    super(props);
    //TODO
    this.urls = {
      search: "TDB",
    };
    this.state = {
      showAccountMenu: false,
      showDebugMenu: false, // For Debug: Drop Down
      searchResults: null,
      searchCurrently: null,
    };
    this._tag = this.constructor.name;
    this.menuRef = React.createRef();
    this.renderAccountMenu = this.renderAccountMenu.bind(this);
  }

  renderDebugMenuLinks(routes, classes) {
    if (!State.Debug) {
      return null;
    }

    return (
      <div>
        <IconButton
          key="debugMenu"
          className={classes.toggleButton + " " + classes.debugObject}
          onClick={e => {
            this.menuRef = e.currentTarget;
            this.setState({ showDebugMenu: true, showAccountMenu: false });
          }}
        >
          <ArrowDropDown />
        </IconButton>
        {State.Debug && this.state.showDebugMenu ? (
          <DebugLinks
            links={routes}
            anchorRef={this.menuRef}
            className={classes.menu}
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
    const { account } = this.props;

    const accountMenu = {
      logout: _.find(routes, route => route.key === LOGOUT),
      setting: _.find(routes, route => route.key === SETTING),
      account: _.find(routes, route => route.key === ACCOUNT),
    };
    return (
      <Grid container item xs={3} md={2} spacing={1} justify="space-around">
        <Grid item xs={10}>
          <Typography variant="h5" component="h5">
            <Link
              underline="hover"
              color="inherit"
              href={accountMenu.account.dynamicPath({ id: _.get(account, "id") })}
            >
              {_.get(account, "firstName")}
            </Link>
          </Typography>
          <FormattedMessage id="common.money.currencySymbol">
            {currencySymbol => (
              <FormattedMessage id="pages.Navibars.Header.Reputation.Donations.name">
                {donations => (
                  <Typography variant="body2" component="span">
                    {donations} {currencySymbol}
                    {prettyNumber(account, "reputation.donations")}
                    {"  "}
                    {/* Intentional Spacing */}
                  </Typography>
                )}
              </FormattedMessage>
            )}
          </FormattedMessage>
          <FormattedMessage id="pages.Navibars.Header.Reputation.Presige.name">
            {presige => (
              <Typography variant="body2" component="span">
                {presige} ({prettyNumber(account, "reputation.presige")})
              </Typography>
            )}
          </FormattedMessage>
        </Grid>
        <Grid item xs={2}>
          <Avatar
            className={classes.profileAvatar}
            alt={_.get(account, "firstName", ["#"])[0]}
            src={getProfileImage(_.get(account, "id"), _.get(account, "profileImg"))}
            onClick={e => {
              this.menuRef = e.currentTarget;
              this.setState({ showAccountMenu: true, showDebugMenu: false });
            }}
          />
        </Grid>
        {this.state.showAccountMenu ? (
          <AccountMenu
            account={account}
            links={accountMenu}
            anchorRef={this.menuRef}
            className={classes.menu}
            close={() => {
              this.menuRef = null;
              this.setState({ showAccountMenu: false });
            }}
          />
        ) : null}
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="sticky" className={this.state._tag + " " + classes.navBar}>
        <FormattedMessage id="_id">
          {locale => (
            <RouteContext.Consumer>
              {routes => (
                <React.Fragment>
                  <GlobalHeader logoSrc="/assets/img/new.logo.png" onSkipToContent={() => {}} onSkipToNav={() => {}}>
                    <GlobalHeaderSearch
                      combobox={
                        <Combobox
                          assistiveText={{ label: "Search" }}
                          events={{
                            onSelect: () => {},
                          }}
                          id="header-search-custom-id"
                          labels={{ placeholder: "Search Salesforce" }}
                          options={[
                            { id: "email", label: "Email" },
                            { id: "mobile", label: "Mobile" },
                          ]}
                        />
                      }
                    />
                    <GlobalHeaderFavorites
                      actionSelected={this.state.favoritesActionSelected}
                      onToggleActionSelected={(event, data) => {
                        this.setState({ favoritesActionSelected: !data.actionSelected });
                      }}
                      popover={
                        <Popover
                          ariaLabelledby="favorites-heading"
                          onClose={() => {}}
                          body={
                            <div>
                              <h2 className="slds-text-heading_small" id="favorites-heading">
                                Favorites
                              </h2>
                            </div>
                          }
                          id="header-favorites-popover-id"
                        />
                      }
                    />
                    <GlobalHeaderTask
                      dropdown={
                        <Dropdown
                          id="header-task-dropdown-id"
                          options={[
                            { id: "taskOptionOne", label: "Task Option One" },
                            { id: "taskOptionTwo", label: "Task Option Two" },
                          ]}
                        />
                      }
                    />
                    <GlobalHeaderHelp
                      popover={
                        <Popover
                          onClose={() => {}}
                          ariaLabelledby="help-heading"
                          body={
                            <div>
                              <h2 className="slds-text-heading_small" id="help-heading">
                                Help and Training
                              </h2>
                            </div>
                          }
                          id="header-help-popover-id"
                        />
                      }
                    />
                    <GlobalHeaderSetup
                      dropdown={
                        <Dropdown
                          id="header-setup-dropdown-id"
                          options={[
                            { id: "setupOptionOne", label: "Setup Option One" },
                            { id: "setupOptionTwo", label: "Setup Option Two" },
                          ]}
                        />
                      }
                    />
                    <GlobalHeaderNotifications
                      notificationCount={5}
                      popover={
                        <Popover
                          ariaLabelledby="header-notifications-custom-popover-content"
                          onClose={() => {}}
                          body={null}
                          id="header-notifications-popover-id"
                        />
                      }
                    />
                    <GlobalHeaderProfile
                      popover={<Popover body={null} onClose={() => {}} id="header-profile-popover-id" />}
                      userName="Art Vandelay"
                    />
                  </GlobalHeader>
                  <Grid item xs={1}>
                    {this.renderDebugMenuLinks(routes.routes(locale), classes)}
                  </Grid>
                </React.Fragment>
              )}
            </RouteContext.Consumer>
          )}
        </FormattedMessage>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object,
  account: AccountShape.isRequired,
  displayType: PropTypes.oneOf(["standard"]),
};

export default withStyles(styles)(Header);
