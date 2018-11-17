import React, { Component } from "react";
import PropTypes from "prop-types";
//import func from '/frontend/src/util/func/func'

import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import ListItemLink from "@material-ui/core/ListItemLink";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
//Icons
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";

import "./Sidebar.css";

const styles = () => ({
  root: {
    width: "100%",
    maxWidth: 200
  }
});

const ListItemLink = props => {
  return <ListItem button component="a" {...props} />;
};

export class Sidebar extends Component {
  constructor(props) {
    super(props);
    //var id=func.generateSerial(9,36);
    this.state = {
      _tag: this.constructor.name
      //_id: id
    };
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
      <div className={this.props.classes.root + " " + this.state._tag}>
        <List component="nav">
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>
        </List>
        <Divider />
        <List component="nav">
          <ListItem button>
            <ListItemText primary="Trash" />
          </ListItem>
          <ListItemLink href="#simple-list">
            <ListItemText primary="Spam" />
          </ListItemLink>
        </List>
      </div>
    );
  }

  static propTypes = {
    userData: PropTypes.object,
    displayType: PropTypes.oneOf(["standard"])
  };

  // static defaultProps = {};
}

export default withStyles(styles)(Sidebar);
