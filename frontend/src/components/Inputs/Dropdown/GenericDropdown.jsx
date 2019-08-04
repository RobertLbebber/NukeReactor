import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

/**
 *  TODO Documentation
 */

class GenericDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._tag = this.constructor.name;
    this._isMount = false;
  }

  componentDidMount() {
    this._isMount = true;
  }

  componentWillUnmount() {
    this._isMount = false;
  }

  render() {
    return <div className={this._tag + " " + this.props.className}>{this.state._tag}</div>;
  }
}

GenericDropdown.propTypes = {
  className: PropTypes.string,
  links: PropTypes.shape()
};

GenericDropdown.defaultProps = {
  className: ""
};
export default withStyle(style)(GenericDropdown);
