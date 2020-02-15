import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import AccountSetting from "Pages/Account/AccountSetting/AccountSetting";
import { AccountCreate } from "Pages/Account/AccountCreate/AccountCreate";
import { AccountShow } from "Pages/Account/AccountShow/AccountShow";

const styles = theme => ({});

/**
 *  TODO Documentation
 */
class AccountRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._tag = this.constructor.name;
    this._mounted = false;
  }

  render() {
    return (
      <div className={this._tag + " " + this.props.className}>
        <Switch>
          <Route path="/account/:id/show" render={() => <AccountShow />} />
          <Route path="/account/:id/show/:pageId" render={() => <AccountShow />} />
          <Route path="/account/:id/create" render={() => <AccountCreate />} />
          <Route path="/account/settings" render={() => <AccountSetting />} />
        </Switch>
      </div>
    );
  }
}

AccountRouter.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
};

AccountRouter.defaultProps = {
  className: "",
  classes: "",
};
export default withStyles(styles)(AccountRouter);
