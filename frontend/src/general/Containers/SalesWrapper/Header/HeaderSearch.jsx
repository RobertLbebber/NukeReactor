import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
//SalesForce
import {
  SLDSGlobalHeaderSearch,
  Combobox
} from "@salesforce/design-system-react";

//import Restful from "util/io/Restful"
//import {} from "@salesforce/design-system-react";
//import {} from "@material-ui/core";

//const style=theme=>{
//    return {
//    }
//}

class HeaderSearch extends Component {
  constructor(props) {
    super(props);
    this._tag = this.constructor.name;
    //this.=this.bind(this);
    //this.state={}
  }

  render() {
    return (
      <div className={this._tag}>
        <SLDSGlobalHeaderSearch
          combobox={
            <Combobox
              assistiveText={{ label: "Search" }}
              events={{
                onSelect: e => {
                  console.log(">>> onSelect");
                }
              }}
              labels={{ placeholder: "Search..." }}
              options={[
                { id: "email", label: "Email" },
                { id: "mobile", label: "Mobile" }
              ]}
            />
          }
        />
      </div>
    );
  }
}

HeaderSearch.propTypes = {
  //    className: PropTypes.string,
  //    classes: PropTypes.object,
};

HeaderSearch.defaultProps = {};
HeaderSearch.displayName = "SLDSGlobalHeaderSearch"; // Required because of third party
//export default withStyle(style)(HeaderSearch)
export default HeaderSearch;
