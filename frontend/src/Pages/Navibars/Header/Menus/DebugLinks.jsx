import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { State } from "../../../../env/InterpretedEnvironment";
import { MenuItem, Menu, MenuList, Link } from "@material-ui/core";
import { HeartbeatContext } from "../../../../Context/HeartbeatContext";

const styles = theme => ({});

/**
 *  TODO Documentation
 */

class DebugLinks extends Component {
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
    if (!State.Debug) {
      return null;
    }
    const { className, close, anchorRef, links } = this.props;
    console.log(className);
    return (
      <Menu className={className} id={this._tag} anchorEl={anchorRef} open={Boolean(anchorRef)} onClose={close}>
        <MenuList>
          <HeartbeatContext.Consumer>
            {heart =>
              _.map(links, (link, i) => (
                <MenuItem
                  button
                  key={link.path + "-" + i}
                  href={
                    link.dynamic && !_.isNil(heart.account) ? link.dynamicPath({ id: heart.account.id }) : link.path
                  }
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
  links: PropTypes.array.isRequired,
  className: PropTypes.string
};

DebugLinks.defaultProps = {
  classes: {}
};
export default withStyles(styles)(DebugLinks);
