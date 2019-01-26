import React, { Component } from "react";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";


//import func from '/frontend/src/util/func/func'

export class Footer extends Component {
  constructor(props) {
    super(props);
    //var id=func.generateSerial(9,36);
    this.state = {
      _tag: this.constructor.name
      //_id: id
    };
    this._isMount = false;
  }

  componentDidMount() {
    this._isMount = true;
  }

  componentWillUnmount() {
    this._isMount = false;
  }

  render() {
    return (
      <div className={this.state._tag}>
        <BottomNavigation className={this.state._tag + "-nav"}>
          <BottomNavigationAction
            label="Recents"
            value="recents"
            icon={<RestoreIcon />}
          />
        </BottomNavigation>
      </div>
    );
  }
}
export default Footer;
