import React, { Component } from "react"
import QRCode from "qrcode.react";
//import PropTypes from "prop-types"
//import _ from "lodash"

//import Restful from "util/io/Restful"
//import {} from "@salesforce/design-system-react";
//import {} from "@material-ui/core";

//const style=theme=>{
//    return {
//    }
//}

class Share extends Component {
    constructor(props) {
        super(props);
        this._tag = this.constructor.name
        //this.=this.bind(this);
        //this.state={}
    }

    render() {
        return (
            <div className={this._tag}>
                <QRCode value={this.props.} />
                {this._tag}
            </div>
        )
    }
}

Share.propTypes = {
    //    className: PropTypes.string,
    //    classes: PropTypes.object,
}

Share.defaultProps = {

};

//export default withStyle(style)(Share)
export default Share