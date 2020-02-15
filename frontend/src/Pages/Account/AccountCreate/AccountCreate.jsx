import React, { Component } from "react";
import PropTypes from "prop-types";
import toastr from "toastr";
import { withStyles } from "@material-ui/core";
import _ from "lodash";

import { PageBuilderLocale } from "Pages/PageBuilder/PageBuilder";
import Loading from "general/Feedback/Graphics/Loading";
import Restful from "util/io/Restful";

const styles = theme => {
  return {
    loading: {
      backgroundColor: theme.palette.primary.hvr,
      top: "auto",
      bottom: 0,
    },
  };
};

export class AccountCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _tag: this.constructor.name,
      loading: true,
      page: null,
      pageId: "",
      error: null,
      account: { ...this.props.body },
      subscribed: false,
    };
    this._mounted = false;
  }

  componentDidMount() {
    this._mounted = true;
    Restful.get(`account/${this.state.account.id}/create/${this.state.pageId}`).then(response => {
      if (this._mounted) {
        let newState = {};
        if (response.ok) {
          newState = { page: response.body, loading: false };
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

  saveChanges(newAccount) {
    this.setState({ account: newAccount });
    Restful.post(`account/update/${this.state.account.id}`, newAccount).then(response => {
      if (this._mounted) {
        if (response.ok) {
          toastr.success("Page may take time to go live", "Successful Published");
          this.setState({ page: response.body });
        } else {
          toastr.error("There was an error reaching the server", "Failed to Publish");
        }
      }
    });
  }

  publishChanges(newAccount) {
    this.setState({ account: newAccount });
    Restful.post(`account/update/${this.state.account.id}`, newAccount).then(response => {
      if (this._mounted) {
        if (response.ok) {
          toastr.success("Page may take time to go live", "Successful Published");
          this.setState({ page: response.body });
        } else {
          toastr.error("There was an error reaching the server", "Failed to Publish");
        }
      }
    });
  }

  render() {
    return (
      <div className={this.state._tag}>
        <PageBuilderLocale onSave={this.saveChanges} onPublish={this.publishChanges} />
        <Loading className="center-container" />
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
export default withStyles(styles)(AccountCreate);
