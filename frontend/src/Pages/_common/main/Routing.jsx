import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Switch } from "react-router-dom";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import { LandingPage } from "Pages/Public/LandingPage";
import { RoutesWithLocale } from "./Routes";
import RouteContextProvider from "Context/RouteContext";
import { flatten as Languages } from "assets/locale/Langauges";
import Footer from "Pages/Navibars/Footer/Footer";
import { State } from "env/InterpretedEnvironment";
import Header from "general/Containers/Header";
import { HeartbeatContext } from "Context/Heartbeat/HeartbeatContext";

export class Router extends Component {
  constructor(props) {
    super(props);
    this._tag = this.constructor.name;
    this._mounted = false;
  }

  render() {
    return (
      <div className={this._tag}>
        <BrowserRouter>
          <HeartbeatContext.Consumer>
            {heart =>
              _.isNil(heart.account) && State.enforceAccount ? (
                <React.Fragment>
                  {window.location.href !== "/" ? <Redirect to="/" /> : null}
                  <LandingPage updateUserDataFn={heart.updateUserData} />
                  <Footer />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div>
                    <div className={"main-content"}>
                      <FormattedMessage id="_id">
                        {lang => (
                          <Switch>
                            {RoutesWithLocale(Languages[lang]).map(route => (
                              <Route
                                exact={route.exact}
                                key={route.name}
                                path={route.path}
                                render={props => (
                                  <RouteContextProvider
                                    value={{ currentRoute: route, currentInfo: props, routes: RoutesWithLocale }}
                                  >
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
                                        <route.component routeShape={props} {...heart.account} />
                                      </React.Fragment>
                                    )}
                                  </RouteContextProvider>
                                )}
                              />
                            ))}
                            <Redirect from="/logout" to="/landing-page" />
                          </Switch>
                        )}
                      </FormattedMessage>
                    </div>
                  </div>
                </React.Fragment>
              )
            }
          </HeartbeatContext.Consumer>
        </BrowserRouter>
      </div>
    );
  }

  // static defaultProps = {};
}
export const RouteShape = {
  history: PropTypes.object,
  locaton: PropTypes.object,
  match: PropTypes.object,
  staticContext: PropTypes.object,
};

export default Router;
