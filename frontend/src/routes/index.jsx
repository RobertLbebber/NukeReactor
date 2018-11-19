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
import {
  BrowserRouter as Router,
  Route
  // Link
} from "react-router-dom";

import Home from "../components/Pages/Index/Home";
// import Electr from "../components/Pages/Electr/Electr";
// import Electee from "../components/Pages/Electee/Electee";
import Feed from "../components/Pages/Feed/Feed";
import Account from "../components/Pages/Account/Account";
import Footer from "../components/Footer/Footer";
import {
  HeartbeatContext,
  HeartbeatProvider
} from "../components/Context/HeartbeatContext";
import Sidebar from "../components/Sidebar/Sidebar";
import func from "../util/func/func";
// import restful from "../util/io/restful";

import "./Index.css";

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
        <HeartbeatProvider>
          <HeartbeatContext.Consumer>
            <Navbar color="light" light expand="md">
              <NavbarBrand href="/">Electr</NavbarBrand>
              <NavbarToggler onClick={this.toggleMenu} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  {indexRoutes.map(indexRoute => (
                    <NavItem key={indexRoute.name}>
                      <NavLink
                        href={
                          indexRoute.exact ? indexRoute.path : indexRoute.alt
                        }
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
                {value => <Sidebar displayType={"standard"} userData={value} />}

                <div className={"main-content"}>
                  {indexRoutes.map(indexRoute => (
                    <Route
                      exact={indexRoute.exact}
                      key={indexRoute.name}
                      path={indexRoute.path}
                      component={indexRoute.component}
                    />
                  ))}
                </div>
                <Footer />
              </div>
            </Router>
          </HeartbeatContext.Consumer>
        </HeartbeatProvider>
      </div>
    );
  }

  // static propTypes = {};

  // static defaultProps = {};
}
export default Index;
