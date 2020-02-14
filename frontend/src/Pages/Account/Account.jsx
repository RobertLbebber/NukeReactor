import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
// import _ from "lodash";
import PageBuilder from "Pages/PageBuilder/PageBuilder";
import Loading from "general/Feedback/Graphics/Loading";
import Restful from "util/io/Restful";

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

export class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _tag: this.constructor.name,
      account: { ...this.props.body },
      subscribed: false,
    };
    this._isMount = false;
  }

  componentDidMount() {
    this._isMount = true;
    Restful.get(`account/${this.state.account.id}`, false)
      .then(object => {
        if (this._isMount) {
          this.setState({
            page: object.body,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    this._isMount = false;
  }

  // saveChanges(newAccount) {
  //   this.setState({ account: newAccount });
  //   Restful.post(`account/update/${this.state.account.id}`, newAccount)
  //     .then(object => {
  //       if (this._isMount) {
  //         console.log(object);
  //         this.setState({
  //           page: object
  //         });
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  // subscribeEvents(globalInput) {
  //   if (!this.state.subscribed) {
  //     globalInput.subscribeTo(this.saveChanges, ["accountEditor", "save"]);
  //     this.setState({ subscribed: true });
  //   }
  // }

  render() {
    return (
      <div className={this.state._tag}>
        <PageBuilder />
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
export default withStyles(styles)(Account);
