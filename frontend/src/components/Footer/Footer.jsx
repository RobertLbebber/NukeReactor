import React, { Component } from "react";
import FooterBar from "../Sections/MaterialWrappers/FooterBar";

export class Footer extends Component {
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
    return (
      <div className={this.state._tag}>
        <FooterBar />
      </div>
    );
  }
}
export default Footer;
