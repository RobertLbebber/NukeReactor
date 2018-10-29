import React, { Component } from "react";
import PropTypes from "prop-types";
//import func from '/frontend/src/util/func/func'

export class Feed extends Component {
  constructor(props) {
    super(props);
    //var id=func.generateSerial(9,36);
    this.state = {
      _tag: this.constructor.name
      //_id: id
    };
    this.isMount = false;
  }

  componentDidMount() {
    this.isMount = true;
  }

  componentWillUnmount() {
    this.isMount = false;
  }

  render() {
    return <div className={this.state._tag}>{this.state._tag}</div>;
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
export default Feed;
