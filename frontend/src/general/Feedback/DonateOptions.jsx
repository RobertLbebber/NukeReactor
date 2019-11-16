import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import { TextsmsOutlined, FacebookOutlined } from "@material-ui/icons";

const styles = theme => ({});

/**
 *  TODO Documentation
 */

class ShareOptions extends Component {
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
    return (
      <div className={this._tag + " " + this.props.className}>
        {/* <TextsmsOutlined /> */}
        {/* <FacebookOutlined /> */}
      </div>
    );
  }
}

ShareOptions.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object
};

ShareOptions.defaultProps = {
  className: "",
  classes: ""
};
export default withStyles(styles)(ShareOptions);
