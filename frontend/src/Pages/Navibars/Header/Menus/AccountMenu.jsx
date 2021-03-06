import React, { Component } from "react";
// import _ from "lodash";
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
    this._tag = this.constructor.name;
    this._mounted = false;
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    const { className, close, anchorRef, links } = this.props;
    return (
      <Menu
        className={this._tag + " " + className}
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
  className: PropTypes.string,
  close: PropTypes.func.isRequired,
  links: PropTypes.object.isRequired
};

AccountMenu.defaultProps = {};
export default withStyles(styles)(AccountMenu);
