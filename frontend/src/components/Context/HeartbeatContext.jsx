import React from "react";
import restful from "../../util/io/restful";
import _ from "lodash";
import { LandingPage } from "../Pages/Public/LandingPage";
export const HeartbeatContext = React.createContext();

export class HeartbeatProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._mounted = false;
    this.heartbeatTimer = setInterval(() => {
      this.heartbeat();
    }, 60000);
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
    this._mounted = true;
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    this._mounted = false;
  }

  updateUserData(data) {}

  render() {
    let content;
    if (_.isNil(this.state.currentUser)) {
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