import PropTypes from "prop-types";
import React from "react";
import _ from "lodash";
import { ViewDay, AccountCircle, Home as HomeIcon, HighlightOff, Code } from "@material-ui/icons";

import { HeartbeatContext } from "../Context/HeartbeatContext";
import Feed from "../Pages/Feed/Feed";
import PageBuilder from "../Pages/PageBuilder/PageBuilder";
import Account from "../Pages/Account/Account";
import Home from "../Pages/Home/Home";
import LandingPage from "../Pages/Public/LandingPage";
import Page404 from "../Pages/Public/Page404";
import AccountSetting from "../Pages/Account/AccountSetting/AccountSetting";

export const HOME = "home";
export const ACCOUNT = "account";
export const PAGE_BUILDER = "pageBuilder";
export const FEED = "feed";
export const LANDING_PAGE = "landingPage";
export const SETTING = "setting";
export const LOGOUT = "logout";
export const PAGE_404 = "page404";

export const PAGES = [HOME, ACCOUNT, PAGE_BUILDER, FEED, LANDING_PAGE, SETTING, LOGOUT];

export default locale =>
  Object.freeze([
    {
      key: HOME,
      path: "/",
      name: _.get(locale, "pages.Home.name", "Home"),
      className: "electr-brand",
      component: Home,
      dynamic: false,
      exact: true,
      iconComponent: <HomeIcon />
    },
    {
      key: ACCOUNT,
      path: "/acc/",
      dynamicPath: ({ id }) => "/acc/" + id,
      name: _.get(locale, "pages.Account.name", "Account"),
      component: Account,
      dynamic: true,
      exact: false,
      iconComponent: <AccountCircle />
    },
    {
      key: PAGE_BUILDER,
      path: "/page-builder/",
      dynamicPath: ({ id }) => "/page-builder/" + id,
      name: _.get(locale, "pages.Account.name", "Page Builder"),
      component: PageBuilder,
      dynamic: true,
      exact: false,
      iconComponent: <AccountCircle />,
      nonStandardNavbar: true
    },
    {
      key: FEED,
      path: "/feed",
      name: _.get(locale, "pages.Account.name", "Feed"),
      component: Feed,
      dynamic: false,
      exact: true,
      iconComponent: <ViewDay />
    },
    {
      key: LANDING_PAGE,
      path: "/landing-page",
      name: _.get(locale, "pages.Public.LandingPage.name", "Landing Page"),
      component: LandingPage,
      dynamic: false,
      exact: true,
      iconComponent: <Code />
    },
    {
      key: SETTING,
      path: "/setting/",
      name: _.get(locale, "pages.Account.SubPages.AccountSettings.name", "Account Settings"),
      component: AccountSetting,
      dynamic: false,
      exact: true
    },
    {
      key: PAGE_404,
      path: "*",
      name: _.get(locale, "pages.Public.Pages.Page404", "Page Not Found"),
      component: Page404,
      dynamic: false,
      exact: false
    },
    {
      key: LOGOUT,
      path: "/logout",
      name: _.get(locale, "pages.Navibars.Header.Menu.Actions.LogOut.name", "Log out"),
      exact: true,
      className: "fixed-bottom",
      component: () => {
        return <HeartbeatContext.Consumer>{heart => heart.destroyCookies()}</HeartbeatContext.Consumer>;
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
