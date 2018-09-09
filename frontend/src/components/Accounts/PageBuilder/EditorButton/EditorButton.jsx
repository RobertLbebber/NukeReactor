import React, { Component } from "react";
import PropTypes from "prop-types";
import "./EditorButton.css";
import { DesignerMenu } from "../DesignerMenu/DesignerMenu";
import OutsideAlerter from "../../../Util/OutsideAlerter";
import func from "../../../../util/func/func";

export class EditorButton extends Component {
  constructor(props) {
    super(props);
    var id = func.generateSerial(9, 36);
    this.state = {
      _tag: this.constructor.name,
      _id: id,
      path: null,
      showDesignerMenu: false
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  handleDesignerMenuOpen() {
    this.setState({ showDesignerMenu: true });
  }

  handleDesignerMenuClose() {
    this.setState({ showDesignerMenu: false });
  }

  render() {
    return (
      <OutsideAlerter eventEmitter={() => this.handleDesignerMenuClose()}>
        <div
          className={`edit-me ${this.props.buttonPosition} pe-7s-plus`}
          onClick={() => this.handleDesignerMenuOpen()}
        >
          {this.state.showDesignerMenu ? (
            <DesignerMenu position={this.props.tooltipPosition} />
          ) : null}
        </div>
      </OutsideAlerter>
    );
  }
  static propTypes = {
    buttonPosition: PropTypes.string,
    tooltipPosition: PropTypes.string
  };
  static defaultProps = {
    buttonPosition: "right",
    tooltipPosition: "left"
  };
}
export default EditorButton;
