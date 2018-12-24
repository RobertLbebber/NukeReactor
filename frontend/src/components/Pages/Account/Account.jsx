import React, { Component } from "react";
import restful from "../../../util/io/restful";
import PropTypes from "prop-types";
import PageCreator from "../../PageCreator/PageCreator";

import _ from "lodash";
//import func from '/frontend/src/util/func/func'

export class Account extends Component {
  constructor(props) {
    super(props);
    // var id = func.generateSerial(9, 36);
    this.state = {
      _tag: this.constructor.name,
      userData: null
      //   _id: id
    };
    this.saveChanges = this.saveChanges.bind(this);
    this._isMount = false;
  }

  componentDidMount() {
    this._isMount = true;
    restful
      .get(`account/${this.props.currentUser.id}`, false)
      .then(object => {
        if (this._isMount) {
          this.setState({
            userData: object
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

  saveChanges(newUserData) {
    console.log(newUserData);
    this.setState({ userData: newUserData });
    restful
      .post(`account/update/${this.props.currentUser.id}`, newUserData)
      .then(object => {
        if (this._isMount) {
          console.log(object);
          // this.setState({
          //   userData: object
          // });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className={this.state._tag}>
        {!_.isNil(this.state.userData) ? (
          <PageCreator
            userData={this.state.userData}
            saveChanges={this.saveChanges}
          />
        ) : null}
      </div>
    );
  }

  static propTypes = {
    //Route Page Props
    history: PropTypes.object,
    locaton: PropTypes.object,
    match: PropTypes.object,
    staticContext: PropTypes.object

    //
  };

  static defaultProps = {};
}
export default Account;
