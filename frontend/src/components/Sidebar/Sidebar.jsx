import React, { Component } from "react";
import PropTypes from "prop-types";
//import func from '/frontend/src/util/func/func'
import { Navbar, NavbarBrand } from "reactstrap";

import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import ListItemLink from "@material-ui/core/ListItemLink";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
//Icons
import _ from "lodash";

import { Link } from "react-router-dom";
import ECrown from "../Util/Icons/ECrown";

const styles = () => ({ root: {} });

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
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    this._isMount = true;
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
    this._isMount = false;
  }

  updateWindowDimensions() {
    this.setState({ showThinBar: window.innerWidth <= 1200 });
  }

  render() {
    let account = this.props.account;
    return (
      <div className={this.props.classes.root + " " + this.state._tag}>
        <Navbar color="light" light expand="md" style={{ paddingLeft: "10px" }}>
          <NavbarBrand href="/" className="brand-name">
            {this.state.showThinBar ? <ECrown fontSize={55} /> : "Electr"}
          </NavbarBrand>
        </Navbar>
        <List component="nav">
          {this.props.routes.map(route => (
            <ListItem
              key={route.name}
              button
              component={Link}
              to={route.dynamic && !_.isNil(account) ? route.path + account.id : route.path}
            >
              <ListItemIcon>{route.iconComponent}</ListItemIcon>
              <ListItemText primary={route.name} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }

  static propTypes = {
    account: PropTypes.object,
    routes: PropTypes.arrayOf(PropTypes.object),
    displayType: PropTypes.oneOf(["standard"])
  };

  // static defaultProps = {};
}

export default withStyles(styles)(Sidebar);
