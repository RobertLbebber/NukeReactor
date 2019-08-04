import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { MenuItem, Menu, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const styles = theme => {
  return {
    menuButton: {
      marginRight: theme.spacing(2)
    }
  };
};
/**
 *  TODO Documentation
 */
class AccountMenu extends Component {
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
    const { classes, close, anchorRef, links } = this.props;
    return (
      <Menu
        className={this._tag + " " + classes.menu}
        id={this._tag}
        anchorEl={anchorRef}
        open={Boolean(anchorRef)}
        onClose={close}
      >
        <MenuItem to={links.setting.path} component={Link}>
          {links.setting.name}
        </MenuItem>
        <MenuItem to={links.logout.path} component={Link}>
          {links.logout.name}
        </MenuItem>
      </Menu>
    );
  }
}

AccountMenu.propTypes = {
  anchorRef: PropTypes.any, //Couldn't Figure it out
  classes: PropTypes.object,
  close: PropTypes.func.isRequired,
  links: PropTypes.object.isRequired
};

AccountMenu.defaultProps = {};
export default withStyles(styles)(AccountMenu);
