import React, { Component } from "react";
import PropTypes from "prop-types";
import ProfileContainer from "components/Accounts/ProfileContainer/ProfileContainer.jsx";

export class FaceContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _tag: "FaceContainer"
    };
  }

  render() {
    // console.log(this.props.face_img);
    // console.log(this.props.face_card);
    // console.log(this.props.profile_card);
    return (
      <div className={this.state._tag}>
        <img src={this.props.face_img} alt="Missing File" className="h-md" />
        <ProfileContainer {...this.props.profile_card} />
      </div>
    );
  }

  static propTypes = {
    // content: PropTypes.object.isRequired,
    face_img: PropTypes.string,
    design: PropTypes.oneOf([
      "default",
      "hidden",
      "background",
      "foreground",
      "sidebar"
    ])
  };

  static defaultProps = {
    type: "default",
    face_img: "url"
  };
}

export default FaceContainer;
