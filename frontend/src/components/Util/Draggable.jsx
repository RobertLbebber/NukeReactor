import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class Draggable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _tag: "Draggable",
      x: props.x,
      y: props.y,
      initPhase: true
    };
    this.gridX = props.gridX || 1;
    this.gridY = props.gridY || 1;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }

  onInit(e) {
    const ref = ReactDOM.findDOMNode(this.reference);
    const box = ref.getBoundingClientRect();
    this.setState({
      initPositionX: box.left,
      initPositionY: box.top,
      initPhase: false
    });
  }

  onMove(e) {
    const x = e.clientX - this.state.initPositionX;
    const y = e.clientY - this.state.initPositionY;
    e.currentTarget.object = { content: this.props.content };
    if (x !== this.state.x || y !== this.state.y) {
      this.setState({ x, y });
      this.props.onMove && this.props.onMove(this.state.x, this.state.y);
    }
  }

  onMouseDown(e) {
    if (e.button !== 0) return;
    if (this.state.initPhase) {
      this.onInit(e);
    }
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mouseup", this.onMouseUp);
    e.preventDefault();
  }

  onMouseUp(e) {
    document.removeEventListener("mousemove", this.onMouseMove);
    this.props.onStop && this.props.onStop(this.state.x, this.state.y);
    document.removeEventListener("mouseup", this.onMouseUp);
    if (this.props.returnToDefault) {
      this.setState({
        x: 0,
        y: 0
      });
    }
    e.currentTarget.object = undefined;
    e.preventDefault();
  }

  onMouseMove(e) {
    this.onMove(e);
    e.preventDefault();
  }

  onTouchStart(e) {
    this.onStart(e.touches[0]);
    document.addEventListener("touchmove", this.onTouchMove, {
      passive: false
    });
    document.addEventListener("touchend", this.onTouchEnd, { passive: false });
    e.preventDefault();
  }

  onTouchMove(e) {
    this.onMove(e.touches[0]);
    e.preventDefault();
  }

  onTouchEnd(e) {
    document.removeEventListener("touchmove", this.onTouchMove);
    document.removeEventListener("touchend", this.onTouchEnd);
    this.props.onStop && this.props.onStop(this.state.x, this.state.y);
    e.preventDefault();
  }

  render() {
    return (
      <div
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onTouchStart}
        style={{
          position: "relative",
          left: this.state.x,
          top: this.state.y,
          touchAction: "none"
        }}
        ref={div => {
          this.reference = div;
        }}
      >
        {this.props.children}
      </div>
    );
  }

  static propTypes = {};

  static propTypes = {
    onMove: PropTypes.func,
    onStop: PropTypes.func,
    gridX: PropTypes.number,
    gridY: PropTypes.number,
    returnToDefault: PropTypes.bool,
    content: PropTypes.string
  };

  static defaultProps = {
    content: "",
    returnToDefault: true
  };
}

export default Draggable;
