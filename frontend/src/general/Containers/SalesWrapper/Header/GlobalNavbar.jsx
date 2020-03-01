import React, { Component } from "react";
//SalesForce
import {
  Combobox,
  SLDSGlobalHeader,
  SLDSGlobalHeaderFavorites,
  SLDSGlobalHeaderHelp,
  SLDSGlobalHeaderNotifications,
  SLDSGlobalHeaderProfile,
  SLDSGlobalHeaderSearch,
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

class GlobalNavbar extends Component {
  static displayName = "SLDSGlobalHeaderExample";

  constructor(props) {
    super(props);
    this.state = {
      favoritesActionSelected: false
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
          <SLDSGlobalHeaderSearch
            combobox={
              <Combobox
                assistiveText={{ label: "Search" }}
                events={{
                  onSelect: () => {
                    console.log(">>> onSelect");
                  }
                }}
                labels={{ placeholder: "Search Salesforce" }}
                options={[
                  { id: "email", label: "Email" },
                  { id: "mobile", label: "Mobile" }
                ]}
              />
            }
          />
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
            popover={<Popover body={<HeaderProfileContent />} />}
            userName="Art Vandelay"
          />
        </SLDSGlobalHeader>
      </IconSettings>
    );
  }
}

export default GlobalNavbar;
