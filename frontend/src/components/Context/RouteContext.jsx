import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

export const RouteContext = React.createContext();

export class RouteContextProvider extends React.Component {
  constructor(props) {
    super(props);

    /**
     * @typedef Shape
     * @property currentRoute
     * @property routes
     * @property currentInfo
     */
    this.state = { value: props.value };
  }

  updateUserData(data) {
    this.setState({ account: { ...data } });
  }

  render() {
    return <RouteContext.Provider value={this.state.value}>{this.props.children}</RouteContext.Provider>;
  }
}

export const RouteShape = PropTypes.shape({
  currentRoute: RouteShape, //Current
  routes: PropTypes.arrayOf(RouteShape),
  currentInfo: PropTypes.object
});
export default RouteContextProvider;
