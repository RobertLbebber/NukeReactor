import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
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

// import Electr from "../components/Pages/Electr/Electr";
//import func from '/frontend/src/util/func/func'
import Feed from "../components/Pages/Feed/Feed";
import Account from "../components/Pages/Account/Account";
import Home from "../components/Pages/Index/Home";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";

const indexRoutes = Object.freeze([
  { path: "/", name: "Home", component: Home, dynamic: false },
  {
    path: "/acc/",
    name: "Account",
    component: Account,
    dynamic: true
  },
  { path: "/Feed", name: "Feed", component: Feed, dynamic: false }
]);

export class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _tag: this.constructor.name
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
    let account = this.props.accountData;
    return (
      <div className={this.state._tag}>
        <Router>
          <React.Fragment>
            <Navbar color="light" light expand="md">
              <NavbarBrand href="/">Electr</NavbarBrand>
              <NavbarToggler onClick={this.toggleMenu} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  {indexRoutes.map(indexRoute => (
                    <NavItem key={indexRoute.name}>
                      <Link
                        to={
                          indexRoute.dynamic && !_.isNil(account)
                            ? indexRoute.path + account.currentUser.id
                            : indexRoute.path
                        }
                      >
                        {indexRoute.name}
                      </Link>
                    </NavItem>
                  ))}
                </Nav>
              </Collapse>
            </Navbar>
            <div>
              <Sidebar displayType={"standard"} userData={account} />
              <div className={"main-content"}>
                {indexRoutes.map(indexRoute => (
                  <Route
                    exact={indexRoute.exact}
                    key={indexRoute.name}
                    path={indexRoute.path}
                    render={props => (
                      <indexRoute.component {...props} {...account} />
                    )}
                  />
                ))}
              </div>
              <Footer />
            </div>
          </React.Fragment>
        </Router>
      </div>
    );
  }

  static propTypes = {
    accountData: PropTypes.object
  };

  static defaultProps = {};
}

export default Routes;
