import React, { Component } from "react";
import { ViewDay, AccountCircle, Home as HomeIcon, HighlightOff, Code } from "@material-ui/icons";

import { HeartbeatContext } from "../components/Context/HeartbeatContext";
import Feed from "../components/Pages/Feed/Feed";
import PageBuilder from "../components/Pages/PageBuilder/PageBuilder";
import Account from "../components/Pages/Account/Account";
import Home from "../components/Pages/Index/Home";
import LogOut from "../components/Pages/Public/LogOut";
import LandingPage from "../components/Pages/Public/LandingPage";

export default Object.freeze([
  {
    path: "/",
    name: "Home",
    className: "electr-brand",
    component: Home,
    dynamic: false,
    exact: true,
    iconComponent: <HomeIcon />
  },
  {
    path: "/acc/",
    name: "Account",
    component: Account,
    dynamic: true,
    exact: false,
    iconComponent: <AccountCircle />
  },
  {
    path: "/page-builder/",
    name: "Page Builder",
    component: PageBuilder,
    dynamic: true,
    exact: false,
    iconComponent: <AccountCircle />
  },
  {
    path: "/feed",
    name: "Feed",
    component: Feed,
    dynamic: false,
    exact: true,
    iconComponent: <ViewDay />
  },
  {
    path: "/landing-page",
    name: "Landing Page",
    component: LandingPage,
    dynamic: false,
    exact: true,
    iconComponent: <Code />
  },
  {
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
