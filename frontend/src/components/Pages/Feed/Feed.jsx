import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { get } from "../../../util/io/restful";
import FeedCard from "../../Sections/MaterialWrappers/FeedCard";
import PostCreator from "../../Inputs/PostCreator";
import {
  GlobalInputsConsumer,
  GlobalInputsProvider
} from "../../Context/GlobalInputsContext";
//import func from '/frontend/src/util/func/func'

const sampleData = [
  {
    content: {
      additionalText: ["Additional Text"],
      date: "Today",
      imgLoc: null,
      imgTooltip: "Image Tooltip",
      mainText: "Main Text",
      title: "This is the title",
      profileImgLoc: null,
      profileName: "Robert"
    }
  },
  {
    content: {
      additionalText: ["Additional Text"],
      date: "Today",
      imgLoc: null,
      imgTooltip: "Image Tooltip",
      mainText: "Main Text",
      title: "This is the title",
      profileImgLoc: null,
      profileName: "Robert"
    }
  },
  {
    content: {
      additionalText: ["Additional Text"],
      date: "Today",
      imgLoc: null,
      imgTooltip: "Image Tooltip",
      mainText: "Main Text",
      title: "This is the title",
      profileImgLoc: null,
      profileName: "Robert"
    }
  },
  {
    content: {
      additionalText: ["Additional Text"],
      date: "Today",
      imgLoc: null,
      imgTooltip: "Image Tooltip",
      mainText: "Main Text",
      title: "This is the title",
      profileImgLoc: null,
      profileName: "Robert"
    }
  },
  {
    content: {
      additionalText: ["Additional Text"],
      date: "Today",
      imgLoc: null,
      imgTooltip: "Image Tooltip",
      mainText: "Main Text",
      title: "This is the title",
      profileImgLoc: null,
      profileName: "Robert"
    }
  },
  {
    content: {
      additionalText: ["Additional Text"],
      date: "Today",
      imgLoc: null,
      imgTooltip: "Image Tooltip",
      mainText: "Main Text",
      title: "This is the title",
      profileImgLoc: null,
      profileName: "Robert"
    }
  }
];

export class Feed extends Component {
  constructor(props) {
    super(props);
    //var id=func.generateSerial(9,36);
    this.state = {
      _tag: this.constructor.name,
      feedData: sampleData
      //_id: id
    };
    this.isMount = false;
  }

  componentDidMount() {
    this.isMount = true;
  }

  componentWillUnmount() {
    this.isMount = false;
  }

  getUserFeed() {
    get("/feed/" + this.props.account.id)
      .then(response => {
        this.setState({
          feedData: response
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  /**
   * TODO: this method
   */
  getEmptyFeed() {
    return null;
  }

  handlePostButton() {
    this.setState({ showPostCreator: false });
  }

  render() {
    return (
      <div className={this.state._tag}>
        {_.isNil(this.state.feedDate)
          ? _.map(this.state.feedData, (feedElement, i) => (
              <FeedCard content={feedElement.content} key={i} />
            ))
          : this.getEmptyFeed()}
        <GlobalInputsConsumer>
          {input => (
            <PostCreator context={input} active={input.activePostEvent} />
          )}
        </GlobalInputsConsumer>
      </div>
    );
  }

  static propTypes = {
    //Route Page Props
    history: PropTypes.object,
    locaton: PropTypes.object,
    match: PropTypes.object,
    staticContext: PropTypes.object
  };

  static defaultProps = {};
}
export default Feed;
