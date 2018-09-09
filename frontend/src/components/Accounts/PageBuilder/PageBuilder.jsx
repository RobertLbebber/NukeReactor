import React, { Component } from "react";
// import PropTypes from "prop-types";
// import Restful from "../../../util/io/restful";
import { Panel } from "react-bootstrap";
import { EditorButton } from "./EditorButton/EditorButton";
import { PageDisplayer } from "../PageBuilder/PageDisplayer/PageDisplayer";
import { dragWrapper } from "../../Util/DragListener";

export class PageBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _tag: this.constructor.name
    };
  }

  componentDidMount() {
    // Restful.get("pagebuilder").then(result1 => {
    //   // console.log(result1);
    // });
    // Restful.post("pagebuilder", "message").then(result2 => {
    //   // console.log(result2);
    // });
  }

  render() {
    var ListeningPageDisplayer = dragWrapper(<PageDisplayer />);
    return (
      <React.Fragment>
        <Panel className={this.state._tag + " ROOT"}>
          <EditorButton />
          <Panel.Heading>Create Your Own Page Layout</Panel.Heading>
          <ListeningPageDisplayer />
        </Panel>
      </React.Fragment>
    );
  }

  // static propTypes = {};

  // static defaultProps = {};
}
export default PageBuilder;
