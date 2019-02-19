import React, { Component } from "react";
//import PropTypes from 'prop-types';
//import func from '/frontend/src/util/func/func'

const GlobalInputsContext = React.createContext();

export class GlobalInputsProvider extends Component {
  constructor(props) {
    super(props);
    this.deactivatePostEvent = this.deactivatePostEvent.bind(this);
    this.activatePostEvent = this.activatePostEvent.bind(this);
    //var id=func.generateSerial(9,36);
    this.state = {
      _tag: this.constructor.name,
      postEvent: {
        activate: this.activatePostEvent,
        deactivate: this.deactivatePostEvent
      },
      activePostEvent: false
    };
    this._isMount = false;
  }

  activatePostEvent = () => {
    this.setState({ activePostEvent: true });
  };

  deactivatePostEvent = () => {
    this.setState({ activePostEvent: false });
  };

  componentDidMount() {
    this._isMount = true;
  }

  componentWillUnmount() {
    this._isMount = false;
  }

  render() {
    return (
      <GlobalInputsContext.Provider value={this.state}>
        {this.props.children}
      </GlobalInputsContext.Provider>
    );
  }

  // static propTypes = {};

  // static defaultProps = {};
}
export const GlobalInputsConsumer = GlobalInputsContext.Consumer;
