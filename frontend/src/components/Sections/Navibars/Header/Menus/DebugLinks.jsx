import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Debug } from "../../../../../util/devvar/devvar";
import { Link } from "react-router-dom";
import { MenuItem, Menu, MenuList } from "@material-ui/core";
import { HeartbeatContext } from "../../../../Context/HeartbeatContext";

const styles = theme => ({});

/**
 *  TODO Documentation
 */

class DebugLinks extends Component {
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
    if (!Debug.ACTIVE) {
      return;
    }
    const { classes, close, anchorRef, links } = this.props;
    return (
      <Menu className={this._tag + " "} id={this._tag} anchorEl={anchorRef} open={Boolean(anchorRef)} onClose={close}>
        <MenuList>
          <HeartbeatContext.Consumer>
            {heart =>
              _.map(links, (link, i) => (
                <MenuItem
                  button
                  key={link.path + "-" + i}
                  to={link.dynamic && !_.isNil(heart.account) ? link.path + heart.account.id : link.path}
                  component={Link}
                >
                  {link.name}
                </MenuItem>
              ))
            }
          </HeartbeatContext.Consumer>
        </MenuList>
      </Menu>
    );
  }
}

DebugLinks.propTypes = {
  anchorRef: PropTypes.any, //Couldn't Figure it out
  classes: PropTypes.object,
  close: PropTypes.func.isRequired,
  links: PropTypes.array.isRequired
};

DebugLinks.defaultProps = {
  className: ""
};
export default withStyles(styles)(DebugLinks);
