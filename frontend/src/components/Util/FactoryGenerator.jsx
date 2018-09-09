import React, { Component } from "react";
//import PropTypes from 'prop-types';
import func from "../../util/func/func";

export const generateFactory = (OuterComponent, InnerComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      var id = func.generateSerial(9, 36);
      this.state = {
        _tag: this.constructor.name,
        _id: id
      };
    }

    render() {
      var InheritedState = OuterComponent.state;
      var InheritedProps = OuterComponent.props;
      return (
        <OuterComponent>
          <InnerComponent {...InheritedState} {...InheritedProps} />
        </OuterComponent>
      );
    }
  };
};
