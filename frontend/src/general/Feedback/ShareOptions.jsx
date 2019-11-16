import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { TextsmsOutlined } from "@material-ui/icons";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { IconButton } from "@material-ui/core";

const styles = theme => ({});

export const TEXT_SMS = "Textsms";
export const FACEBOOK = "Facebook";
export const INSTAGRAM = "Instagram";

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
        <IconButton onClick={() => this.props.onClick(TEXT_SMS)}>
          <TextsmsOutlined />
        </IconButton>
        <IconButton onClick={() => this.props.onClick(FACEBOOK)}>
          <FaFacebook />
        </IconButton>
        <IconButton onClick={() => this.props.onClick(INSTAGRAM)}>
          <FaInstagram />
        </IconButton>
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
