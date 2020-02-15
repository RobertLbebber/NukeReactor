import PropTypes from "prop-types";
import React from "react";
import _ from "lodash";
import { ViewDay, AccountCircle, Home as HomeIcon, HighlightOff, Code } from "@material-ui/icons";

import Feed from "Pages/Feed/Feed";
import PageBuilder from "Pages/PageBuilder/PageBuilder";
import AccountRouter from "Pages/Account/AccountRouter";
import Home from "Pages/Home/Home";
import LandingPage from "Pages/Public/LandingPage";
import AccountSetting from "Pages/Account/AccountSetting/AccountSetting";
import { HeartbeatContext } from "Context/Heartbeat/HeartbeatContext";
import Page404 from "Pages/Public/Page404";
import Page503 from "Pages/Public/Page503";
// import HeartbeatContext from "Context/Heartbeat/HeartbeatContext";

export const HOME = "home";
export const ACCOUNT = "account";
export const PAGE_BUILDER = "pageBuilder";
export const FEED = "feed";
export const LANDING_PAGE = "landingPage";
export const SETTING = "setting";
export const LOGOUT = "logout";
export const PAGE_404 = "page404";
export const PAGE_503 = "page503";

export const PAGES = [HOME, ACCOUNT, PAGE_BUILDER, FEED, LANDING_PAGE, SETTING, LOGOUT];

const Routes = Object.freeze([
  {
    key: HOME,
    path: "/",
    className: "electr-brand",
    component: Home,
    dynamic: false,
    exact: true,
    iconComponent: <HomeIcon />,
  },
  {
    key: ACCOUNT,
    path: "/account/",
    dynamicPath: ({ id }) => "/account/" + id,
    component: AccountRouter,
    dynamic: true,
    exact: false,
    iconComponent: <AccountCircle />,
  },
  {
    key: PAGE_BUILDER,
    path: "/page-builder/",
    dynamicPath: ({ id }) => "/page-builder/" + id,
    component: PageBuilder,
    dynamic: true,
    exact: false,
    iconComponent: <AccountCircle />,
    nonStandardNavbar: true,
  },
  {
    key: FEED,
    path: "/feed",
    component: Feed,
    dynamic: false,
    exact: true,
    iconComponent: <ViewDay />,
  },
  {
    key: LANDING_PAGE,
    path: "/landing-page",
    component: LandingPage,
    dynamic: false,
    exact: true,
    iconComponent: <Code />,
  },
  {
    key: SETTING,
    path: "/setting/",
    component: AccountSetting,
    dynamic: false,
    exact: true,
  },
  {
    key: PAGE_503,
    path: "/Page503",
    component: Page503,
    dynamic: false,
    exact: false,
  },
  {
    key: PAGE_404,
    path: "/*",
    component: Page404,
    dynamic: false,
    exact: false,
  },
  {
    key: LOGOUT,
    path: "/logout",
    exact: true,
    className: "fixed-bottom",
    component: () => {
      return <HeartbeatContext.Consumer>{heart => heart.destroyCookies()}</HeartbeatContext.Consumer>;
    },
    dynamic: false,
    iconComponent: <HighlightOff />,
  },
]);

export default Routes;
export const RoutesWithLocale = locale =>
  Object.freeze([
    {
      ..._.find(Routes, route => route.key === HOME),
      name: _.get(locale, "pages.Home.name", "Home"),
    },
    {
      ..._.find(Routes, route => route.key === ACCOUNT),
      name: _.get(locale, "pages.Account.name", "Account"),
    },
    {
      ..._.find(Routes, route => route.key === PAGE_BUILDER),
      name: _.get(locale, "pages.PageBuilder.name", "Page Builder"),
    },
    {
      ..._.find(Routes, route => route.key === FEED),
      name: _.get(locale, "pages.Feed.name", "Feed"),
    },
    {
      ..._.find(Routes, route => route.key === LANDING_PAGE),
      name: _.get(locale, "pages.Public.LandingPage.name", "Landing Page"),
    },
    {
      ..._.find(Routes, route => route.key === SETTING),
      name: _.get(locale, "pages.Account.SubPages.AccountSettings.name", "Account Settings"),
    },
    {
      ..._.find(Routes, route => route.key === PAGE_503),
      name: _.get(locale, "pages.Public.Pages.Page503", "Page In Service"),
    },
    {
      ..._.find(Routes, route => route.key === LOGOUT),
      name: _.get(locale, "pages.Navibars.Header.Menu.Actions.LogOut.name", "Log out"),
    },
    {
      //This one must be last as it it the catch all
      ..._.find(Routes, route => route.key === PAGE_404),
      name: _.get(locale, "pages.Public.Pages.Page404", "Page Not Found"),
    },
  ]);

export const RouteShape = PropTypes.shape({
  key: PropTypes.string,
  path: PropTypes.string,
  name: PropTypes.string,
  exact: PropTypes.bool,
  className: PropTypes.string,
  component: PropTypes.node,
  dynamic: PropTypes.bool,
  iconComponent: PropTypes.node,
});
