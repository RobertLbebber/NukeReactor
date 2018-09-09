import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import func from "../../../../util/func/func";
import { fullHTMLType } from "../../../../util/shapes/HTMLObject";
import { sample } from "../../../../assets/data/fullHTMLTypeSample";

export class JsonInterpreter extends Component {
  constructor(props) {
    super(props);
    var id = func.generateSerial(9, 36);
    this.state = {
      _tag: this.constructor.name,
      _id: id,
      _isMounted: false
    };
  }

  componentDidMount() {
    let displayableElement = this.startShadowDom();
    console.log(displayableElement);
    this.setState({
      _isMounted: true,
      displayable: displayableElement
    });
    console.log(this.state.displayable);
  }

  startShadowDom() {
    var shadowHTML = this.generateShadowDOM(this.props.jsonHTML);
    console.log(shadowHTML);
    var props = this.getProps(this.props.jsonHTML);
    return React.createElement(this.props.jsonHTML.tag, props, shadowHTML);
  }

  generateShadowDOM(jsonHTML) {
    const rce = React.createElement;
    let targetElement = [];
    if (!_.isNil(jsonHTML)) {
      if (!_.isNil(jsonHTML.innerText)) {
        targetElement.push(
          rce(
            "span",
            { key: _.uniqueId(jsonHTML.id + "_it_") },
            jsonHTML.innerText
          )
        );
      }
      if (!_.isNil(jsonHTML.children)) {
        jsonHTML.children.map(child => {
          var children = this.generateShadowDOM(child);
          var props = this.getProps(child);
          targetElement.push(rce(child.tag, props, children));
        });
      }
    }
    return targetElement;
  }

  getProps(jsonElement) {
    var result = {
      value: !_.isNil(jsonElement.value) ? jsonElement.value : undefined,
      id: !_.isNil(jsonElement.id) ? jsonElement.id : undefined,
      name: !_.isNil(jsonElement.name) ? jsonElement.name : undefined,
      className: !_.isNil(jsonElement.class) ? jsonElement.class : undefined,
      style: !_.isNil(jsonElement.style) ? jsonElement.style : undefined,
      key: _.uniqueId(jsonElement.id)
    };
    switch (jsonElement.tag) {
      case "img":
        result["src"] = !_.isNil(jsonElement.src) ? jsonElement.src : undefined;
        result["alt"] = !_.isNil(jsonElement.alt) ? jsonElement.alt : undefined;
        break;
      case "button":
      case "input":
        result["type"] = !_.isNil(jsonElement.type)
          ? jsonElement.type
          : undefined;
        result["placeholder"] = !_.isNil(jsonElement.placeholder)
          ? jsonElement.placeholder
          : undefined;
        break;
      case "form":
        result["method"] = !_.isNil(jsonElement.method)
          ? jsonElement.method
          : undefined;
        result["action"] = !_.isNil(jsonElement.action)
          ? jsonElement.action
          : undefined;
        break;
    }
    return result;
  }

  componentWillUnmount() {
    this.setState({
      _isMounted: false
    });
  }

  render() {
    console.log("This is this.props.jsonHTML: ", this.props.jsonHTML);
    console.log(
      "This is this.state.displayableElement: ",
      this.state.displayableElement
    );
    var element = this.startShadowDom();
    return (
      <React.Fragment>
        <p>
          Interpreting <a>{this.props.toInterpret}</a>
        </p>
        {this.state.displayableElement}
        {element}
      </React.Fragment>
    );
  }

  static propTypes = {
    jsonHTML: PropTypes.shape(fullHTMLType),
    toInterpret: PropTypes.string
  };

  static defaultProps = {
    jsonHTML: sample
  };
}
export default JsonInterpreter;
