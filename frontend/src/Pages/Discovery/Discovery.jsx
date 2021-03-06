import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import sampleData from "assets/data/Feed";
import { get } from "util/io/Restful";
import PostCreator from "general/Inputs/Form/PostCreator";
import FeedCard from "general/Containers/MaterialWrappers/FeedCard";

class Discovery extends Component {
  constructor(props) {
    super(props);
    this._tag = this.constructor.name;
    this.state = {
      feedData: sampleData,
    };
    this._mounted = false;
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  getUserFeed() {
    get("/discovery/" + this.props.account.id).then(response => {
      this.setState({
        feedData: response,
      });
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
      <div className={this._tag}>
        {_.isNil(this.state.feedDate)
          ? _.map(this.state.feedData, (feedElement, i) => <FeedCard content={feedElement.content} key={i} />)
          : this.getEmptyFeed()}
        <PostCreator
        // context={input} active={input.activePostEvent}
        />
      </div>
    );
  }

  static propTypes = {
    //Route Page Props
    history: PropTypes.object,
    locaton: PropTypes.object,
    match: PropTypes.object,
    staticContext: PropTypes.object,
  };

  static defaultProps = {};
}
export default Discovery;
