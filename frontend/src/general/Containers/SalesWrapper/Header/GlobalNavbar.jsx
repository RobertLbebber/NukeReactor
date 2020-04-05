import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
//SalesForce
import {
  SLDSGlobalHeader,
  SLDSGlobalHeaderFavorites,
  SLDSGlobalHeaderHelp,
  SLDSGlobalHeaderNotifications,
  SLDSGlobalHeaderProfile,
  SLDSGlobalHeaderSetup,
  SLDSGlobalHeaderTask,
  IconSettings,
  Dropdown,
  Popover
} from "@salesforce/design-system-react";
//First Party
import HeaderNotificationsContent from "./HeaderNotificationContent";
import HeaderProfileContent from "./HeaderProfileContent";
//Mock Data
import NotificationMockData from "assets/data/NotificationMockData.json";
import { HeartbeatContext } from "Context/Heartbeat/HeartbeatContext";
import HeaderSearch from "./HeaderSearch";
import { RouteShape } from "Pages/_common/main/Routing";

const styles = theme => {
  return {
    navBar: {
      backgroundColor: theme.palette.primary.hvr,
      boxShadow: "none"
      // marginBottom: theme.spacing(1),
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
    },
    profileAvatar: {
      backgroundColor: "lightgray"
    },
    menu: {
      top: "35px !important"
    }
  };
};

class GlobalNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritesActionSelected: false
    };
    this.redirects = {
      ...this.prop.routes,
      notifications: id => (window.location.href = "TBD")
    };
  }

  render() {
    return (
      <IconSettings iconPath="/assets/icons">
        <SLDSGlobalHeader
          logoSrc="/assets/images/logo.svg"
          onSkipToContent={() => {
            console.log(">>> Skip to Content Clicked");
          }}
          onSkipToNav={() => {
            console.log(">>> Skip to Nav Clicked");
          }}
        >
          <HeaderSearch />
          <SLDSGlobalHeaderFavorites
            actionSelected={this.state.favoritesActionSelected}
            onToggleActionSelected={(event, data) => {
              this.setState({ favoritesActionSelected: !data.actionSelected });
            }}
            popover={
              <Popover
                body={
                  <div>
                    <h2 className="slds-text-heading_small">Favorites</h2>
                  </div>
                }
              />
            }
          />
          <SLDSGlobalHeaderTask
            dropdown={
              <Dropdown
                options={[
                  { id: "taskOptionOne", label: "Task Option One" },
                  { id: "taskOptionTwo", label: "Task Option Two" }
                ]}
              />
            }
          />
          <SLDSGlobalHeaderHelp
            popover={
              <Popover
                body={
                  <div>
                    <h2 className="slds-text-heading_small" id="help-heading">
                      Help and Training
                    </h2>
                  </div>
                }
              />
            }
          />
          <SLDSGlobalHeaderSetup
            dropdown={
              <Dropdown
                options={[
                  { id: "setupOptionOne", label: "Setup Option One" },
                  { id: "setupOptionTwo", label: "Setup Option Two" }
                ]}
              />
            }
          />
          <SLDSGlobalHeaderNotifications
            notificationCount={5}
            popover={
              <Popover
                ariaLabelledby="header-notifications-custom-popover-content"
                body={
                  <HeaderNotificationsContent items={NotificationMockData} />
                }
              />
            }
          />
          <SLDSGlobalHeaderProfile
            popover={
              <Popover
                body={
                  <HeartbeatContext.Consumer>
                    {heart => (
                      <HeaderProfileContent
                        pages={this.redirects}
                        userName={this.props.account.name}
                        destroySession={heart.destroySession}
                      />
                    )}
                  </HeartbeatContext.Consumer>
                }
              />
            }
            userName={this.props.account.name}
          />
        </SLDSGlobalHeader>
      </IconSettings>
    );
  }

  routes = RouteShape;
  static propTypes = { classes: PropTypes.object, routes: this.routes };
  static defaultProps = {};
}

export default withStyles(styles)(GlobalNavbar);
