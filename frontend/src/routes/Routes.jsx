import React, { Component } from "react";
import _ from "lodash";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import Header from "../components/Sections/Navibars/Header/Header";
import { Debug, devvar } from "../util/devvar/devvar";
import { Switch } from "react-router-dom";
import { HeartbeatContext } from "../components/Context/HeartbeatContext";
import { LandingPage } from "../components/Pages/Public/LandingPage";
import indexRoutes from "./routes.js";
import RouteContextProvider from "../components/Context/RouteContext";

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
                  <div>
                    <div className={"main-content"}>
                      <Switch>
                        {indexRoutes.map(indexRoute => (
                          <Route
                            exact={indexRoute.exact}
                            key={indexRoute.name}
                            path={indexRoute.path}
                            render={props => (
                              <RouteContextProvider
                                value={{ renderInfo: indexRoute, routeInfo: props, routesInfo: indexRoutes }}
                              >
                                <Header
                                  componentName={indexRoute.name}
                                  displayType={"standard"}
                                  routes={indexRoutes}
                                  account={heart.account}
                                />
                                <indexRoute.component {...props} {...heart.account} />
                              </RouteContextProvider>
                            )}
                          />
                        ))}
                      </Switch>
                    </div>
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
