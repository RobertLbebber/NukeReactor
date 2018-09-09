import React, { Component } from "react";
import PropTypes from "prop-types";
import func from "../../../../util/func/func";
import { Panel } from "react-bootstrap";
import { JsonInterpreter } from "../JsonInterpreter/JsonInterpreter";
import "./PageDisplayer.css";

export class PageDisplayer extends Component {
  constructor(props) {
    super(props);
    var id = func.generateSerial(9, 36);
    this.state = {
      _tag: this.constructor.name,
      _id: id,
      content: "",
      hasContent: false
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}
  componentWillUpdate() {
    if (this.props.content && !this.state.hasContent) {
      this.setState({
        hasContent: true
      });
    } else if (!this.props.content && this.state.hasContent) {
    }
  }

  render() {
    return (
      <div
        className={
          this.state._tag + (this.state.hasContent ? " hasContent" : " empty ")
        }
      >
        <Panel.Body>
          {this.state.hasContent ? (
            <JsonInterpreter toInterpret={this.props.content} />
          ) : (
            this.props.emptyMessage
          )}
        </Panel.Body>
      </div>
    );
  }

  static propTypes = {
    emptyMessage: PropTypes.string
  };

  static defaultProps = { emptyMessage: "Add Your Content Here" };
}
export default PageDisplayer;
