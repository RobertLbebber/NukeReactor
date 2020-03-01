import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
// import {
//   Typography,
//   Toolbar,
//   IconButton,
//   Avatar,
//   Grid,
//   Link
// } from "@material-ui/core";
// import { ArrowDropDown } from "@material-ui/icons";
// import { FormattedMessage } from "react-intl";

import { RouteContext } from "Context/RouteContext";

import GlobalNavbar from "./SalesWrapper/Header/GlobalNavbar";
// import AccountMenu from "Pages/Navibars/Header/Menus/AccountMenu";
// import { LOGOUT, SETTING, ACCOUNT } from "Pages/_common/main/Routes";
// import DebugLinks from "Pages/Navibars/Header/Menus/DebugLinks";

// import { State } from "env/InterpretedEnvironment";
import { AccountShape } from "Context/Heartbeat/HeartbeatContext";
// import { getProfileImage } from "util/io/UserAPIs";
// import { prettyNumber } from "util/func/lodashExtension";

class Header extends Component {
  constructor(props) {
    super(props);
    //TODO
    this.state = {
      showAccountMenu: false,
      showDebugMenu: false, // For Debug: Drop Down
      searchResults: null,
      searchCurrently: null
    };
    this._tag = this.constructor.name;
    // this.menuRef = React.createRef();
    // this.renderAccountMenu = this.renderAccountMenu.bind(this);
  }

  // renderDebugMenuLinks(routes, classes) {
  //   if (!State.Debug) {
  //     return null;
  //   }

  //   return (
  //     <div>
  //       <IconButton
  //         key="debugMenu"
  //         className={classes.toggleButton + " " + classes.debugObject}
  //         onClick={e => {
  //           this.menuRef = e.currentTarget;
  //           this.setState({ showDebugMenu: true, showAccountMenu: false });
  //         }}
  //       >
  //         <ArrowDropDown />
  //       </IconButton>
  //       {State.Debug && this.state.showDebugMenu ? (
  //         <DebugLinks
  //           links={routes}
  //           anchorRef={this.menuRef}
  //           className={classes.menu}
  //           close={() => {
  //             this.menuRef = null;
  //             this.setState({ showDebugMenu: false });
  //           }}
  //         />
  //       ) : null}
  //     </div>
  //   );
  // }

  // renderAccountMenu(routes, classes) {
  //   return (
  //     <Grid container item xs={3} md={2} spacing={1} justify="space-around">
  //       <Grid item xs={10}>
  //         <Typography variant="h5" component="h5">
  //           <Link
  //             underline="hover"
  //             color="inherit"
  //             href={accountMenu.account.dynamicPath({
  //               id: _.get(account, "id")
  //             })}
  //           >
  //             {_.get(account, "firstName")}
  //           </Link>
  //         </Typography>
  //         <FormattedMessage id="common.money.currencySymbol">
  //           {currencySymbol => (
  //             <FormattedMessage id="pages.Navibars.Header.Reputation.Donations.name">
  //               {donations => (
  //                 <Typography variant="body2" component="span">
  //                   {donations} {currencySymbol}
  //                   {prettyNumber(account, "reputation.donations")}
  //                   {"  "}
  //                   {/* Intentional Spacing */}
  //                 </Typography>
  //               )}
  //             </FormattedMessage>
  //           )}
  //         </FormattedMessage>
  //         <FormattedMessage id="pages.Navibars.Header.Reputation.Presige.name">
  //           {presige => (
  //             <Typography variant="body2" component="span">
  //               {presige} ({prettyNumber(account, "reputation.presige")})
  //             </Typography>
  //           )}
  //         </FormattedMessage>
  //       </Grid>
  //       <Grid item xs={2}>
  //         <Avatar
  //           className={classes.profileAvatar}
  //           alt={_.get(account, "firstName", ["#"])[0]}
  //           src={getProfileImage(
  //             _.get(account, "id"),
  //             _.get(account, "profileImg")
  //           )}
  //           onClick={e => {
  //             this.menuRef = e.currentTarget;
  //             this.setState({ showAccountMenu: true, showDebugMenu: false });
  //           }}
  //         />
  //       </Grid>
  //       {this.state.showAccountMenu ? (
  //         <AccountMenu
  //           account={account}
  //           links={accountMenu}
  //           anchorRef={this.menuRef}
  //           className={classes.menu}
  //           close={() => {
  //             this.menuRef = null;
  //             this.setState({ showAccountMenu: false });
  //           }}
  //         />
  //       ) : null}
  //     </Grid>
  //   );
  // }

  render() {
    return (
      <RouteContext.Consumer>
        {routes => (
          <GlobalNavbar routes={routes} account={this.props.account} />
        )}
      </RouteContext.Consumer>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object,
  account: AccountShape.isRequired,
  displayType: PropTypes.oneOf(["standard"])
};

export default Header;
