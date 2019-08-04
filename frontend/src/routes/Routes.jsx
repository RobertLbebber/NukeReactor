import React, { Component } from "react";
import _ from "lodash";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import Header from "../components/Sections/Navibars/Header/Header";
import { Debug, devvar } from "../util/devvar/devvar";
import { Switch } from "react-router-dom";
import { HeartbeatContext } from "../components/Context/HeartbeatContext";
import { LandingPage } from "../components/Pages/Public/LandingPage";
import routes from "./routes.js";
import RouteContextProvider from "../components/Context/RouteContext";
import { Container } from "@material-ui/core";

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
                        {routes.map(route => (
                          <Route
                            exact={route.exact}
                            key={route.name}
                            path={route.path}
                            render={props => (
                              <RouteContextProvider value={{ currentRoute: route, currentInfo: props, routes: routes }}>
                                {Boolean(route.nonStandardNavbar) ? (
                                  <route.component {...props} {...heart.account} />
                                ) : (
                                  <React.Fragment>
                                    <Header
                                      componentName={route.name}
                                      displayType={"standard"}
                                      routes={route}
                                      account={heart.account}
                                    />
                                    <Container fixed>
                                      <route.component {...props} {...heart.account} />
                                    </Container>
                                  </React.Fragment>
                                )}
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
