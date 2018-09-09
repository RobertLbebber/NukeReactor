import React, { Component } from "react";
import { Table, Tooltip, Glyphicon } from "react-bootstrap";
import func from "../../../../util/func/func";
import "./DesignerMenu.css";
import Draggable from "../../../Util/Draggable";
import PropTypes from "prop-types";

export class DesignerMenu extends Component {
  constructor(props) {
    super(props);
    var id = func.generateSerial(9, 36);
    this.state = {
      _tag: "DesignerMenu",
      _id: id
    };
  }
  componentDidMount() {}
  componentWillUnmount() {}

  handleAddition(event) {
    // console.log("This is Ive Been clicked: ", event);
  }
  handleMoving(event) {
    // console.log("This is Ive Been Dragged: ", event);
  }

  render() {
    return (
      <Tooltip
        placement={"" + this.props.position}
        className="in"
        id={
          this.state._tag + ` tooltip-${this.props.position} ` + this.state._id
        }
      >
        <Table>
          <tbody>
            <tr>
              <td
                onClick={() => this.handleAddition()}
                onDragStart={() => this.handleMoving()}
              >
                <Draggable content={"Designer-Container"}>
                  <Glyphicon glyph="modal-window" />
                </Draggable>
                Container
              </td>
              <td
                onClick={() => this.handleAddition()}
                onDragStart={() => this.handleMoving()}
              >
                <Draggable content={"Designer-Words"}>
                  <Glyphicon glyph="edit" />
                </Draggable>
                Words
              </td>
              <td
                onClick={() => this.handleAddition()}
                onDragStart={() => this.handleMoving()}
              >
                <Draggable content={"Designer-Chart"}>
                  <Glyphicon glyph="stats" />
                </Draggable>
                Chart
              </td>
            </tr>
            <tr>
              <td
                onClick={() => this.handleAddition()}
                onDragStart={() => this.handleMoving()}
              >
                <Draggable content={"Designer-Image"}>
                  <Glyphicon glyph="picture" />
                </Draggable>
                Image
              </td>
              <td
                onClick={() => this.handleAddition()}
                onDragStart={() => this.handleMoving()}
              >
                <Draggable content={"Designer-Seperator"}>
                  <Glyphicon glyph="minus" />
                </Draggable>
                Seperator
              </td>
              <td
                onClick={() => this.handleAddition()}
                onDragStart={() => this.handleMoving()}
              >
                <Draggable content={"Designer-Form"}>
                  <Glyphicon glyph="list-alt" />
                </Draggable>
                Form
              </td>
            </tr>
          </tbody>
        </Table>
      </Tooltip>
    );
  }
  static propTypes = {
    position: PropTypes.oneOf(["right", "left"])
  };
  static defaultProps = {
    position: "right"
  };
}
export default DesignerMenu;
