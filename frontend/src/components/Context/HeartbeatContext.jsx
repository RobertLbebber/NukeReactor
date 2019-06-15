import React from "react";
import _ from "lodash";
import Cookies from "js-cookie";
import Redirect from "react-router-dom/Redirect";

import Restful from "../../util/io/Restful";
import { LandingPage } from "../Pages/Public/LandingPage";
import { Debug, devvar } from "../../util/devvar/devvar";

export const HeartbeatContext = React.createContext();

export class HeartbeatProvider extends React.Component {
  constructor(props) {
    super(props);
    this.destroyCookies = this.destroyCookies.bind(this);
    this.updateUserData = this.updateUserData.bind(this);
    this.heartbeatTimer = setInterval(() => {
      this.heartbeat();
    }, 600000);

    let account = Cookies.get("account");
    if (!_.isNil(account)) {
      let cachedAccount = JSON.parse(account);
      if (!_.isNil(cachedAccount)) {
        account = { ...cachedAccount };
      }
    }
    this.state = {
      account: account,
      destroyCookies: this.destroyCookies,
      updateUserData: this.updateUserData
    };
    this._mounted = false;
  }

  destroyCookies() {
    Restful.get("logout")
      .then(response => {
        this.setState({ account: null });
      })
      .catch(error => {
        this.setState({ account: null });
        Cookies.remove("account", { path: "/", domain: devvar.LOCAL });
        Cookies.remove("UID", { path: "/", domain: devvar.LOCAL });
        console.error(error);
      });
  }

  heartbeat() {
    Restful.get("getMe", false)
      .then(response => {
        if (this._mounted) {
          if (!_.isNil(response)) {
            this.setState({ ...this.state, ...response });
          }
        }
      })
      .catch(error => {
        if (error.status === 410) {
          this.setState({ account: null });
        }
      });
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  updateUserData(data) {
    this.setState({ account: { ...data } });
  }

  render() {
    return <HeartbeatContext.Provider value={this.state}>{this.props.children}</HeartbeatContext.Provider>;
  }
}
export default HeartbeatProvider;
