import PropTypes from "prop-types";
import React from "react";
import _ from "lodash";
import {
  ViewDay,
  AccountCircle,
  Home as HomeIcon,
  HighlightOff,
  Code
} from "@material-ui/icons";

import Discovery from "Pages/Discovery/Discovery";
import PageBuilder from "Pages/PageBuilder/PageBuilder";
import AccountRouter from "Pages/Account/AccountRouter";
import Home from "Pages/Home/Home";
import LandingPage from "Pages/Public/LandingPage";
import AccountSetting from "Pages/Account/AccountSetting/AccountSetting";
import { HeartbeatContext } from "Context/Heartbeat/HeartbeatContext";
import Donate from "Pages/Public/Donate/Donate";
import Page404 from "Pages/Public/Page404";
import Page503, { PAGE_UNAVAILABLE } from "Pages/Public/Page503";
// import HeartbeatContext from "Context/Heartbeat/HeartbeatContext";

export const HOME = "home";
export const ACCOUNT = "account";
export const PAGE_BUILDER = "pageBuilder";
export const DISCOVERY = "feed";
export const LANDING_PAGE = "landingPage";
export const SETTING = "setting";
export const LOGOUT = "logout";
export const DONATE = "donate";
export const PAGE_404 = "page404";
export const PAGE_503 = "page503";

export const PAGES = [
  HOME,
  ACCOUNT,
  PAGE_BUILDER,
  DISCOVERY,
  LANDING_PAGE,
  SETTING,
  LOGOUT,
  DONATE,
  PAGE_404,
  PAGE_503
];

const getName = (locale, route) => {
  let path = _.get(Routes, `${route}.locale.path`);
  let defaultValue = _.get(Routes, `${route}.locale.default`);
  return _.get(locale, path, defaultValue);
};

const getRedirect = route => {
  return obj =>
    _.get(Routes, `${route}.dynamic`)
      ? (window.location.href = route.dynamicPath(obj))
      : (window.location.href = route.path);
};

const Routes = Object.freeze({
  [ACCOUNT]: {
    dynamicPath: ({ id }) => "/account/" + id,
    component: AccountRouter,
    dynamic: true,
    exact: false,
    iconComponent: <AccountCircle />,
    locale: {
      path: "pages.Account.name",
      default: "Account",
      getName: locale => getName(locale, ACCOUNT)
    },
    key: ACCOUNT,
    path: "/account/",
    redirect: getRedirect(ACCOUNT)
  },
  [DISCOVERY]: {
    key: DISCOVERY,
    path: "/feed",
    component: Discovery,
    dynamic: false,
    exact: true,
    iconComponent: <ViewDay />,
    locale: {
      path: "pages.Discovery.name",
      default: "Discovery",
      getName: locale => getName(locale, DISCOVERY)
    },
    redirect: getRedirect(DISCOVERY)
  },
  [DONATE]: {
    component: Donate,
    dynamic: true,
    dynamicPath: ({ id }) => "/donate/" + id,
    exact: false,
    locale: {
      path: "pages.Public.Pages.Donate",
      default: "Donate",
      getName: locale => getName(locale, DONATE)
    },
    key: DONATE,
    path: PAGE_UNAVAILABLE,
    redirect: getRedirect(DONATE)
  },
  [HOME]: {
    component: Home,
    dynamic: false,
    exact: true,
    iconComponent: <HomeIcon />,
    locale: {
      path: "pages.Home.name",
      default: "Home",
      getName: locale => getName(locale, HOME)
    },
    key: HOME,
    path: "/",
    redirect: getRedirect(HOME)
  },
  [LANDING_PAGE]: {
    component: LandingPage,
    dynamic: false,
    exact: true,
    iconComponent: <Code />,
    locale: {
      path: "pages.LandingPage.name",
      default: "Landing Page",
      getName: locale => getName(locale, LANDING_PAGE)
    },
    key: LANDING_PAGE,
    path: "/landing-page",
    redirect: getRedirect(LANDING_PAGE)
  },
  [LOGOUT]: {
    component: () => {
      return (
        <HeartbeatContext.Consumer>
          {heart => heart.destroyCookies()}
        </HeartbeatContext.Consumer>
      );
    },
    dynamic: false,
    exact: true,
    iconComponent: <HighlightOff />,
    locale: {
      path: "pages.Navibars.Header.Menu.Actions.LogOut.name",
      default: "Log Out",
      getName: locale => getName(locale, LOGOUT)
    },
    key: LOGOUT,
    path: "/logout",
    redirect: getRedirect(LOGOUT)
  },
  [PAGE_503]: {
    component: Page503,
    dynamic: false,
    exact: true,
    locale: {
      path: "pages.Public.Pages.Page503",
      default: "Page In Service",
      getName: locale => getName(locale, PAGE_503)
    },
    key: PAGE_503,
    path: PAGE_UNAVAILABLE,
    redirect: getRedirect(PAGE_503)
  },
  [PAGE_404]: {
    component: Page404,
    dynamic: false,
    exact: false,
    locale: {
      path: "pages.Public.Pages.Page404",
      default: "Page Not Found",
      getName: locale => getName(locale, PAGE_404)
    },
    key: PAGE_404,
    // path: "/*",
    redirect: getRedirect(PAGE_404)
  },
  [PAGE_BUILDER]: {
    component: PageBuilder,
    dynamic: true,
    dynamicPath: ({ id }) => "/page-builder/" + id,
    exact: false,
    iconComponent: <AccountCircle />,
    locale: {
      path: "pages.PageBuilder.name",
      default: "Page Builder",
      getName: locale => getName(locale, PAGE_BUILDER)
    },
    key: PAGE_BUILDER,
    nonStandardNavbar: true,
    path: "/page-builder/",
    redirect: getRedirect(PAGE_BUILDER)
  },
  [SETTING]: {
    component: AccountSetting,
    dynamic: false,
    exact: true,
    locale: {
      path: "pages.Account.SubPages.AccountSettings.name",
      default: "Account Settings",
      getName: locale => getName(locale, SETTING)
    },
    key: SETTING,
    path: "/setting/",
    redirect: getRedirect(SETTING)
  }
});

let locale = PropTypes.shape({
  path: PropTypes.string,
  default: PropTypes.string,
  getName: PropTypes.func
});

export let RouteShape = PropTypes.shape({
  component: PropTypes.node,
  dynamic: PropTypes.bool,
  exact: PropTypes.bool,
  iconComponent: PropTypes.node,
  locale,
  key: PropTypes.string,
  name: PropTypes.string,
  path: PropTypes.string,
  redirect: PropTypes.func
});

export const RoutesLocale = locale => {
  let routeLocale = {};
  for (let key in Routes) {
    let routeObj = Routes[key];
    routeLocale[key] = routeObj;
    try {
      routeLocale[key].name = routeObj[key].locale.getName(locale);
    } catch (error) {
      console.warning("Failed to populate Route(" + key + ") with locale");
    }
  }
  return routeLocale;
};

export default Routes;
