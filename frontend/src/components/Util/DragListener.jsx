import React from "react";
import ReactDOM from "react-dom";
//import PropTypes from 'prop-types';
export const dragWrapper = ListeningComponent => {
  class DragListener extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        _tag: "DragListener",
        isDragging: false,
        draggedContentOver: {},
        InheritedStates: {}
      };
    }
    componentDidMount() {
      const ref = ReactDOM.findDOMNode(this.reference);
      const box = ref.getBoundingClientRect();
      document.addEventListener("mouseup", e => {
        if (box.bottom > e.clientY && e.clientY > box.top) {
          if (box.left < e.clientX && e.clientX < box.right) {
            if (
              this.state.draggedContentOver !== undefined &&
              this.state.draggedContentOver !== null
            ) {
              this.setState({
                InheritedStates: e.currentTarget.object,
                isDragging: false
              });
            }
          }
        }
      });
      document.addEventListener("mousemove", e => {
        if (box.bottom > e.clientY && e.clientY > box.top) {
          if (box.left < e.clientX && e.clientX < box.right) {
            this.setState({
              isDragging: true,
              draggedContentOver: e.currentTarget.object
            });
          }
        }
      });
    }
    componentWillUnmount() {}
    render() {
      return (
        <div
          ref={div => {
            this.reference = div;
          }}
        >
          {React.cloneElement(ListeningComponent, {
            ...this.state.InheritedStates
          })}
        </div>
      );
    }
    // static propTypes = {};
    // static defaultProps = {};
  }
  return DragListener;
};
