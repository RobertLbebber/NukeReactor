import React, { Component } from "react";
// import PropTypes from "prop-types";

import FaceContainer from "components/Accounts/FaceContainer/FaceContainer.jsx";
import BodyContainer from "components/Accounts/BodyContainer/BodyContainer.jsx";

class Electr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _tag: "Electr"
    };
    /**     <TEMPLATE>
     *      this.setState({
     *        face_card: {
     *          profile_card: {
     *            profile_img: "url",
     *            content: "element"
     *          },
     *          face_img: "url"
     *        },
     *        body_card: {
     *          tab_type: "enum",
     *          content: "element"
     *        }
     *      });
     *      </TEMPLATE>
     */
  }

  componentWillMount() {
    this.getSettings();
  }

  getSettings() {
    //prototype
    this.setState({
      face_card: {
        profile_card: {
          profile_name: "Amy Smith",
          profile_img:
            "https://scstylecaster.files.wordpress.com/2015/10/model-with-glowing-skin.jpg",
          profile_img_design: "border",
          content: <div>I want to be a big boy</div>,
          design: "left-top",
          glue: "sticky"
        },
        face_img:
          "https://www.coolfbcovers.com/covers-images/download/IMG_0220.JPG"
      },
      body_card: {
        tab_type: "enum",
        content: "element"
      }
    });
  }

  render() {
    return (
      <div className={this.state._tag}>
        <FaceContainer {...this.state.face_card} />
        <BodyContainer {...this.state.body_card} />
      </div>
    );
  }
}

// validating prop types
// Electr.propTypes = {
// };

export default Electr;
