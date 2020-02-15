import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import _ from "lodash";
import Loading from "general/Feedback/Graphics/Loading";
import Restful from "util/io/Restful";
import { getAccountPath } from "util/io/UserAPIs";
import { Redirect } from "react-router-dom";
import PageShower from "Pages/PageBuilder/PageShower";

const styles = theme => {
  console.log(theme);
  return {
    loading: {
      backgroundColor: theme.palette.primary.hvr,
      top: "auto",
      bottom: 0,
    },
  };
};

export class AccountShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      page: null,
      pageId: "",
      error: null,
      account: { ...this.props.body },
      subscribed: false,
    };
    this._tag = this.constructor.name;
    this._mounted = false;
  }

  componentDidMount() {
    this._mounted = true;
    let showAccountPage = getAccountPath(this.state.account.id, `show/${this.state.pageId}`);

    Restful.get(showAccountPage).then(response => {
      if (this._mounted) {
        let newState = {};
        if (response.ok) {
          newState = { page: response.body, loading: false };
        } else if (_.isNil(response.status)) {
          newState = { error: { message: null, redirect: 503 }, loading: false };
        } else {
          newState = { error: response.body, loading: false };
        }
        this.setState(newState);
      }
    });
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  renderContent() {
    let errorMessage;
    if (!_.isEmpty(this.state.error)) {
      if (_.has(this.state.error, "redirect")) {
        return <Redirect to={`/Page${this.state.error.redirect}`} />;
      } else {
        errorMessage = this.state.error.message;
      }
    }
    return <GEditor components={this.state.page} />;
  }

  render() {
    return (
      <div className={this.state._tag}>
        {this.state.loading ? <Loading className="center-container" /> : this.renderContent()}
      </div>
    );
  }

  static propTypes = {
    //Route Page Props
    history: PropTypes.object,
    locaton: PropTypes.object,
    match: PropTypes.object,
    staticContext: PropTypes.object,
    body: PropTypes.object,

    //
  };

  static defaultProps = {};
}
export default withStyles(styles)(AccountShow);
