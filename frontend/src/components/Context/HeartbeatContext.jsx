import React from "react";
import _ from "lodash";
import Cookies from "js-cookie";

import restful from "../../util/io/restful";
import { LandingPage } from "../Pages/Public/LandingPage";
import { Debug } from "../../util/devvar/devvar";

export const HeartbeatContext = React.createContext();

export class HeartbeatProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: Cookies.get("email"),
      user: null
    };
    this._mounted = false;
    this.heartbeatTimer = setInterval(() => {
      this.heartbeat();
    }, 600000);
    this.updateUserData = this.updateUserData.bind(this);
  }
  heartbeat() {
    restful
      .get("getMe", false)
      .then(response => {
        if (this._mounted) {
          if (!_.isNil(response)) {
            this.setState({ ...this.state, ...response });
          }
        }
      })
      .catch(error => {
        if (error.status === 410) {
          this.setState({ currentUser: null });
        }
      });
  }

  componentDidMount() {
    let cachedAccount = Cookies.get("user");
    let cachedAccount2 = Cookies.get();
    Cookies.set("manual", "value");
    localStorage.setItem("SelectedOption", "4");
    // let cachedAccount = JSON.parse(Cookies.get("user"));
    console.log(cachedAccount);
    console.log(cachedAccount2);
    if (!_.isNil(cachedAccount)) {
      this.setState({ account: cachedAccount });
    }
    this._mounted = true;
  }

  componentDidUpdate() {
    let cachedAccount = Cookies.get("user");
    let cachedAccount2 = Cookies.get();
    // let cachedAccount = JSON.parse(Cookies.get("user"));
    console.log(cachedAccount);
    console.log(cachedAccount2);
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  updateUserData(data) {
    this.setState({ userEmail: data });
    console.log(Cookies.get("user"));
  }

  render() {
    let content;
    if (_.isNil(this.state.userEmail) && Debug.enforceAccount) {
      content = <LandingPage updateUserDataFn={this.updateUserData} />;
    } else {
      content = (
        <HeartbeatContext.Provider value={this.state}>
          {this.props.children}
        </HeartbeatContext.Provider>
      );
    }
    return content;
  }
}
export default HeartbeatProvider;
