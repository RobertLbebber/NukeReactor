import React from "react";
import restful from "../../util/io/restful";
export const UserContext = React.createContext();

export class UserProvider extends React.Component {
  componentDidMount() {
    console.log("mounted");
    this._mounted = true;
    restful.get("getMe").then(response => {
      if (this._mounted) {
        console.log(response);
        if (true) {
        } else {
          this.setState({ ...response });
        }
      }
    });
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserContext;
