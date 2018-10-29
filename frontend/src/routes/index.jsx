import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "../components/Pages/Index/Home";
import Electr from "../components/Pages/Electr/Electr";
import Electee from "../components/Pages/Electee/Electee";
import Feed from "../components/Pages/Feed/Feed";
import Account from "../components/Pages/Account/Account";
import func from "../util/func/func";

const indexRoutes = Object.freeze([
  { path: "/", name: "Home", component: Home, exact: true },
  {
    path: "/acc/:accountID",
    alt: `/acc/${func.generateSerial(9, 36)}`,
    name: "Account",
    component: Account,
    exact: false
  },
  { path: "/Feed", name: "Feed", component: Feed, exact: true }
]);

// var indexRoutes = [
//   { path: "/Electr", name: "Electr", component: Electr },
//   { path: "/Electee", name: "Electee", component: Electee }
// { path: "/Feed", name: "Feed", component: Feed }
// ];

//import PropTypes from 'prop-types';
//import func from '/frontend/src/util/func/func'

export class Index extends Component {
  constructor(props) {
    super(props);
    // var id = func.generateSerial(9, 36);
    this.state = {
      _tag: this.constructor.name,
      //   _id: id
      isOpen: false
    };
    this._isMounted = false;
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  toggleMenu() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div className={this.state._tag}>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Electr</NavbarBrand>
          <NavbarToggler onClick={this.toggleMenu} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {indexRoutes.map(indexRoute => (
                <NavItem key={indexRoute.name}>
                  <NavLink
                    href={indexRoute.exact ? indexRoute.path : indexRoute.alt}
                  >
                    {indexRoute.name}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
          </Collapse>
        </Navbar>
        <Router>
          <div>
            {indexRoutes.map(indexRoute => (
              <Route
                exact={indexRoute.exact}
                key={indexRoute.name}
                path={indexRoute.path}
                component={indexRoute.component}
              />
            ))}
          </div>
        </Router>
      </div>
    );
  }

  // static propTypes = {};

  // static defaultProps = {};
}
export default Index;
