import React from "react";
import _ from "lodash";

export const RouteContext = React.createContext();

export class RouteContextProvider extends React.Component {
  constructor(props) {
    super(props);

    /**
     * @typedef Shape
     * @property routeInfo
     * @property renderInfo
     * @property routesInfo
     */
    this.state = { value: props.value };
    console.log(props);
  }

  updateUserData(data) {
    this.setState({ account: { ...data } });
  }

  render() {
    return <RouteContext.Provider value={this.state.value}>{this.props.children}</RouteContext.Provider>;
  }
}
export default RouteContextProvider;
