import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Navbar, NavbarBrand } from "reactstrap";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import {
  ViewDay,
  AccountCircle,
  Home as HomeIcon,
  HighlightOff
} from "@material-ui/icons";
import { Debug, devvar } from "../util/devvar/devvar";

// import Electr from "../components/Pages/Electr/Electr";
//import func from '/frontend/src/util/func/func'
import Feed from "../components/Pages/Feed/Feed";
import Account from "../components/Pages/Account/Account";
import Home from "../components/Pages/Index/Home";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import LogOut from "../components/Pages/Public/LogOut";
import { HeartbeatContext } from "../components/Context/HeartbeatContext";
import { LandingPage } from "../components/Pages/Public/LandingPage";

const indexRoutes = Object.freeze([
  {
    path: "/",
    name: "Home",
    component: Home,
    dynamic: false,
    iconComponent: <HomeIcon />
  },
  {
    path: "/acc/",
    name: "Account",
    component: Account,
    dynamic: true,
    iconComponent: <AccountCircle />
  },
  {
    path: "/Feed",
    name: "Feed",
    component: Feed,
    dynamic: false,
    iconComponent: <ViewDay />
  },
  {
    path: "/logout",
    name: "Log out",
    component: () => {
      console.log("functions");
      return (
        <HeartbeatContext.Consumer>
          {heart => <LogOut logOutFn={heart.destroyCookies} />}
        </HeartbeatContext.Consumer>
      );
    },
    dynamic: false,
    iconComponent: <HighlightOff />
  }
]);

export class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _tag: this.constructor.name
    };
    this._isMount = false;
  }

  componentDidMount() {
    this._isMount = true;
  }

  componentWillUnmount() {
    this._isMount = false;
  }

  render() {
    return (
      <div className={this.state._tag}>
        <Router>
          <HeartbeatContext.Consumer>
            {heart =>
              _.isNil(heart.account) && Debug.enforceAccount ? (
                <React.Fragment>
                  {window.location.href !== "/" ? <Redirect to="/" /> : null}
                  <LandingPage updateUserDataFn={heart.updateUserData} />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Electr</NavbarBrand>
                  </Navbar>
                  <div>
                    <Sidebar
                      displayType={"standard"}
                      routes={indexRoutes}
                      account={heart.account}
                    />
                    <div className={"main-content"}>
                      {indexRoutes.map(indexRoute => (
                        <Route
                          exact={indexRoute.exact}
                          key={indexRoute.name}
                          path={indexRoute.path}
                          render={props => (
                            <indexRoute.component
                              {...props}
                              {...heart.account}
                            />
                          )}
                        />
                      ))}
                    </div>
                    <Footer />
                  </div>
                </React.Fragment>
              )
            }
          </HeartbeatContext.Consumer>
        </Router>
      </div>
    );
  }

  // static propTypes = {  };

  // static defaultProps = {};
}

export default Routes;
