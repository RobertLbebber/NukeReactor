import React, { Component } from "react";

// import { CookiesProvider } from "universal-cookie";
import {
  HeartbeatContext,
  HeartbeatProvider
} from "../components/Context/HeartbeatContext";
import { Routes } from "./Routes";
import "./Index.css";

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
        {/* <CookiesProvider> */}
        <HeartbeatProvider>
          <HeartbeatContext.Consumer>
            {user => <Routes accountData={user.account} />}
          </HeartbeatContext.Consumer>
        </HeartbeatProvider>
        {/* </CookiesProvider> */}
      </div>
    );
  }

  // static propTypes = {};

  // static defaultProps = {};
}
export default Index;
