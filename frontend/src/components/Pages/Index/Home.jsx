import React, { Component } from "react";
import PropTypes from "prop-types";
import gibberish from "../../../assets/data/GibberishText.json";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _tag: this.constructor.name
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className={this.state._tag}>
        {this.state._tag}
        {gibberish.message}
      </div>
    );
  }

  static propTypes = {
    //Route Page Props
    history: PropTypes.object,
    locaton: PropTypes.object,
    match: PropTypes.object,
    staticContext: PropTypes.object
  };

  static defaultProps = {};
}
export default Home;
