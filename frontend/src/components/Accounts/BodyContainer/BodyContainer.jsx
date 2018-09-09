import React, { Component } from "react";
import PropTypes from "prop-types";

export class BodyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _tag: "BodyContainer"
    };
  }

  render() {
    return <div className={this.state._tag}>{this.props.content}</div>;
  }

  static propTypes = {
    // content: PropTypes.object.isRequired,
    design: PropTypes.oneOf(["default", "hidden"]),
    tab_type: PropTypes.oneOf(["jump", "pages", "none"])
  };

  static defaultProps = {
    design: "default",
    tab_type: "none"
  };
}
export default BodyContainer;
