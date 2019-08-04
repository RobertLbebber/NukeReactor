import React from "react";
import { ViewDay, AccountCircle, Home as HomeIcon, HighlightOff, Code } from "@material-ui/icons";

import { HeartbeatContext } from "../components/Context/HeartbeatContext";
import Feed from "../components/Pages/Feed/Feed";
import PageBuilder from "../components/Pages/PageBuilder/PageBuilder";
import Account from "../components/Pages/Account/Account";
import Home from "../components/Pages/Index/Home";
import LogOut from "../components/Pages/Public/LogOut";
import LandingPage from "../components/Pages/Public/LandingPage";
import PropTypes from "prop-types";
import AccountSetting from "../components/Pages/Account/AccountSetting/AccountSetting";

export const HOME = "home";
export const ACCOUNT = "account";
export const PAGE_BUILDER = "pageBuilder";
export const FEED = "feed";
export const LANDING_PAGE = "landingPage";
export const SETTING = "setting";
export const LOGOUT = "logout";

export default Object.freeze([
  {
    key: "home",
    path: "/",
    name: "Home",
    className: "electr-brand",
    component: Home,
    dynamic: false,
    exact: true,
    iconComponent: <HomeIcon />
  },
  {
    key: "account",
    path: "/acc/",
    name: "Account",
    component: Account,
    dynamic: true,
    exact: false,
    iconComponent: <AccountCircle />
  },
  {
    key: "pageBuilder",
    path: "/page-builder/",
    name: "Page Builder",
    component: PageBuilder,
    dynamic: true,
    exact: false,
    iconComponent: <AccountCircle />,
    nonStandardNavbar: true
  },
  {
    key: "feed",
    path: "/feed",
    name: "Feed",
    component: Feed,
    dynamic: false,
    exact: true,
    iconComponent: <ViewDay />
  },
  {
    key: "landingPage",
    path: "/landing-page",
    name: "Landing Page",
    component: LandingPage,
    dynamic: true,
    exact: true,
    iconComponent: <Code />
  },
  {
    key: "setting",
    path: "/setting/",
    name: "Account Settings",
    component: AccountSetting,
    dynamic: false,
    exact: true
  },
  {
    key: "logout",
    path: "/logout",
    name: "Log out",
    exact: true,
    className: "fixed-bottom",
    component: () => {
      return (
        <HeartbeatContext.Consumer>{heart => <LogOut logOutFn={heart.destroyCookies} />}</HeartbeatContext.Consumer>
      );
    },
    dynamic: false,
    iconComponent: <HighlightOff />
  }
]);

export const RouteShape = PropTypes.shape({
  key: PropTypes.string,
  path: PropTypes.string,
  name: PropTypes.string,
  exact: PropTypes.bool,
  className: PropTypes.string,
  component: PropTypes.node,
  dynamic: PropTypes.bool,
  iconComponent: PropTypes.node
});
