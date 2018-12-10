import React from "react";
import restful from "../../util/io/restful";
import _ from "lodash";
import { LandingPage } from "../Pages/Public/LandingPage";
import { Debug } from "../../util/devvar/devvar";
export const AccountContext = React.createContext();

export class AccountProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: null };
    this._mounted = false;
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    this._mounted = false;
  }

  updateUserData(data) {
    this.setState({ currentUser: data });
  }

  render() {
    let content;
    if (_.isNil(this.state.currentUser) && Debug.enforceAccount) {
      content = <LandingPage updateUserDataFn={this.updateUserData} />;
    } else {
      content = (
        <AccountContext.Provider value={this.state}>
          {this.props.children}
        </AccountContext.Provider>
      );
    }
    return content;
  }
}
export default AccountProvider;
