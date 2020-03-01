import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Cookies from "js-cookie";

import Restful from "util/io/Restful";
import { Details, State } from "env/InterpretedEnvironment";

export const HeartbeatContext = React.createContext();

export class HeartbeatProvider extends React.Component {
  constructor(props) {
    super(props);
    this.destroyCookies = this.destroyCookies.bind(this);
    this.updateUserData = this.updateUserData.bind(this);
    let account = Cookies.get("account");
    if (State.Debug && !State.enforceAccount) {
      account = {
        accountPage: "/user/-1/page/index",
        id: "-1",
        email: "fake@email.com",
        firstName: "Bobasdsadas",
        lastName: "Hert",
        profileImg: "src/assets/img/faces/face-0.jpg",
        reputation: {
          donations: 0,
          presige: 0,
        },
      };
    } else {
      if (!_.isNil(account)) {
        let cachedAccount = JSON.parse(account);
        if (!_.isNil(cachedAccount)) {
          account = { ...cachedAccount };
        }
        this.heartbeatTimer = setInterval(() => {
          this.heartbeat();
        }, 600000);
      }
    }

    this.state = {
      account: account,
      destroyCookies: this.destroyCookies,
      updateUserData: this.updateUserData,
    };
    this._mounted = false;
  }

  destroyCookies() {
    Restful.put("logout").then(response => {
      if (this._mounted) {
        if (response.ok) {
          this.setState({ account: null });
        } else {
          this.setState({ account: null });
          Cookies.remove("account", { path: "/", domain: Details.LOCAL });
          Cookies.remove("UID", { path: "/", domain: Details.LOCAL });
          console.error(response.status);
        }
      }
    });
  }

  heartbeat() {
    Restful.get("getMe", false).then(response => {
      if (this._mounted) {
        if (response.ok) {
          this.setState({ ...this.state, ...response });
        } else if (response.status === 410) {
          this.setState({ account: null });
        }
      }
    });
  }

  componentDidMount() {
    this._mounted = true;
    if (State.enforceAccount) {
      this.heartbeat();
    }
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
export const AccountShape = PropTypes.shape({
  accountPage: PropTypes.string,
  id: PropTypes.string,
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  profileImg: PropTypes.string,
  reputation: PropTypes.shape({
    donations: PropTypes.number,
    presige: PropTypes.number,
  }),
});

export default HeartbeatProvider;
