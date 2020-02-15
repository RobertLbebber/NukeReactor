import React, { Component } from "react";
import _ from "lodash";

const GlobalInputsContext = React.createContext();

export class GlobalInputsProvider extends Component {
  constructor(props) {
    super(props);
    this.deactivatePostEvent = this.deactivatePostEvent.bind(this);
    this.activatePostEvent = this.activatePostEvent.bind(this);
    this.subscribeTo = this.subscribeTo.bind(this);
    this.state = {
      _tag: this.constructor.name,
      subscribeTo: this.subscribeTo,
      //Items
      activePostEvent: false,
      postEvent: {
        activate: this.activatePostEvent,
        deactivate: this.deactivatePostEvent
      },
      activeAccountEditor: false,
      accountEditor: {
        activate: this.activateAccountEditor,
        deactivate: this.deactivateAccountEditor,
        save: null
      }
    };
    this._mounted = false;
  }

  activatePostEvent = () => {
    this.setState({ activePostEvent: true });
  };

  deactivatePostEvent = () => {
    this.setState({ activePostEvent: false });
  };

  activateAccountEditor = () => {
    this.setState({ activeAccountEditor: true });
  };

  deactivateAccountEditor = () => {
    this.setState({ activeAccountEditor: false });
  };

  subscribeTo(fn, path) {
    this.setState(_.set(this.state, path, fn));
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return (
      <GlobalInputsContext.Provider value={this.state}>{this.props.children}</GlobalInputsContext.Provider>
    );
  }

  // static propTypes = {};

  // static defaultProps = {};
}
export const GlobalInputsConsumer = GlobalInputsContext.Consumer;
