import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import { Debug, devvar } from "../util/devvar/devvar";
import { Switch } from "react-router-dom";
import { HeartbeatContext } from "../components/Context/HeartbeatContext";
import { LandingPage } from "../components/Pages/Public/LandingPage";
import indexRoutes from "./routes.js";

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
                    <Sidebar
                      displayType={"standard"}
                      routes={indexRoutes}
                      account={heart.account}
                    />
                    <div className={"main-content"}>
                      <Switch>
                        {indexRoutes.map(indexRoute => (
                          <Route
                            exact={indexRoute.exact}
                            key={indexRoute.name}
                            path={indexRoute.path}
                            render={props => (
                              <React.Fragment>
                                <indexRoute.component
                                  {...props}
                                  {...heart.account}
                                />
                                <Footer />
                              </React.Fragment>
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
