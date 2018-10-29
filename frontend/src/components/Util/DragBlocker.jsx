import React from "react";
import func from "../../util/func/func";
import ReactDOM from "react-dom";

export const dragWrapper = MutingComponent => {
  class DragBlocker extends React.Component {
    constructor(props) {
      super(props);
      var id = func.generateSerial(9, 36);
      this.state = {
        _tag: this.constructor.name,
        _id: id,
        _isMounted: false,
        draggedContentOver: {},
        InheritedStates: {}
      };
    }
    componentDidMount() {
      this.setState({
        _isMounted: true
      });

      const ref = ReactDOM.findDOMNode(this.reference);
      ref.className = this.state._tag;
      const box = ref.getBoundingClientRect();
      document.addEventListener("mousemove", e => {
        if (box.bottom > e.clientY && e.clientY > box.top) {
          if (box.left < e.clientX && e.clientX < box.right) {
            if (
              e.currentTarget.object !== undefined &&
              e.currentTarget.object !== null
            ) {
              this.setState({
                draggedContentOver: e.currentTarget.object
              });
              e.currentTarget.object = undefined;
            }
          }
        }
      });
      document.addEventListener("mouseout", e => {
        if (box.bottom > e.clientY && e.clientY > box.top) {
          if (box.left < e.clientX && e.clientX < box.right) {
            if (
              this.state.draggedContentOver !== undefined &&
              this.state.draggedContentOver !== null
            ) {
              e.currentTarget.object = this.state.draggedContentOver;
              this.setState({
                draggedContentOver: {}
              });
            }
          }
        }
      });
    }

    componentWillUnmount() {
      this.setState({
        _isMounted: false
      });
    }

    render() {
      return (
        <div
          ref={div => {
            this.reference = div;
          }}
        >
          {React.cloneElement(MutingComponent, {
            ...this.state.InheritedStates
          })}
        </div>
      );
    }
  }
  return DragBlocker;
};
