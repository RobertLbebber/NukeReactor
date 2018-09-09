import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "components/Card/Card";
import "./ProfileContainer.css";

export class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _tag: "ProfileContainer"
    };
  }

  render() {
    console.log(this.props);
    return (
      <Card
        class={this.state._tag + " " + this.props.design}
        title={this.props.profile_name}
        hCenter={true}
        content={
          <React.Fragment>
            <div>
              <img
                src={this.props.profile_img}
                alt="Missing File"
                className="size-lg row "
              />
            </div>
            {/* <img
              src={this.props.profile_img}
              alt="Missing File"
              className="size-md circle row "
            />
            <img
              src={this.props.profile_img}
              alt="Missing File"
              className="size-lg round row "
            /> */}
            {this.props.content}
          </React.Fragment>
        }
      />
    );
  }

  static propTypes = {
    profile_img: PropTypes.string,
    profile_img_design: PropTypes.oneOf(["circle", "default", "round", "none"]),
    glue: PropTypes.oneOf(["default", "sticky", "stuck"]),
    design: PropTypes.oneOf([
      "default",
      "hidden",
      "left-low",
      "left-top",
      "mid",
      "right-top",
      "right-low"
    ]),
    content: PropTypes.element.isRequired
  };

  static defaultProp = {
    design: "default",
    glue: "default",
    profile_img: "url",
    profile_img_design: "default"
  };
}

export default ProfileContainer;
