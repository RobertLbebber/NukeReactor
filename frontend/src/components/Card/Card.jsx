import React, { Component } from "react";
import PropTypes from "prop-types";

export class Card extends Component {
  render() {
    return (
      <div
        className={
          this.props.class + " card" + (this.props.plain ? " card-plain" : "")
        }
      >
        <div className={"header" + (this.props.hCenter ? " text-center" : "")}>
          <h4 className="title">{this.props.title}</h4>
          <p className="category">{this.props.category}</p>
        </div>
        <div
          className={
            "content" +
            (this.props.ctAllIcons ? " all-icons" : "") +
            (this.props.ctTableFullWidth ? " table-full-width" : "") +
            (this.props.ctTableResponsive ? " table-responsive" : "") +
            (this.props.ctTableUpgrade ? " table-upgrade" : "")
          }
        >
          {this.props.content}

          <div className="footer">
            {this.props.legend}
            {this.props.stats != null ? <hr /> : ""}
            <div className="stats">
              <i className={this.props.statsIcon} /> {this.props.stats}
            </div>
          </div>
        </div>
      </div>
    );
  }
  static propTypes = {
    class: PropTypes.string,
    //head
    plain: PropTypes.bool,
    hCenter: PropTypes.bool,
    title: PropTypes.string,
    category: PropTypes.string,

    //content table
    ctAllIcons: PropTypes.bool,
    ctTableFullWidth: PropTypes.bool,
    ctTableResponsive: PropTypes.bool,
    ctTableUpgrade: PropTypes.bool,

    //body
    content: PropTypes.any,

    //footer
    legend: PropTypes.any,
    statsIcon: PropTypes.string,
    stats: PropTypes.element
  };

  static defaultProp = {
    //head
    plain: true,
    hCenter: false,
    title: "",
    category: "",

    //content table
    ctAllIcons: false,
    ctTableFullWidth: false,
    ctTableResponsive: false,
    ctTableUpgrade: false,

    //body
    content: null,

    //footer
    legend: null,
    statsIcon: "",
    stats: null
  };
}

export default Card;
