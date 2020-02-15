import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

/**
 *  TODO Documentation
 */
class PageShower extends Component {
  constructor(props) {
    super(props);
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
    return <GEditor components={this.}/>
  }
}

PageShower.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
};

PageShower.defaultProps = {
  className: "",
  classes: "",
};
export default withStyles(styles)(PageShower);
