import React, { Component } from "react"
import QRCode from "qrcode.react";
import { FormattedMessage } from "react-intl";
import BackButton from "general/Inputs/Buttons/BackButton";
//import PropTypes from "prop-types"
//import _ from "lodash"

//import Restful from "util/io/Restful"
//import {} from "@salesforce/design-system-react";
//import {} from "@material-ui/core";

const style = theme => {
    return {
    }
}

class Donate extends Component {
    constructor(props) {
        super(props);
        this._tag = this.constructor.name
        //this.=this.bind(this);
        //this.state={}
    }

    render() {
        return (
            <div className={this._tag}>
                <BackButton />
                <FormattedMessage id={"Pages.Donation.Header"} />
                <QRCode />
                {this._tag}
            </div>
        )
    }
}

Donate.propTypes = {
    //    className: PropTypes.string,
    //    classes: PropTypes.object,
}

Donate.defaultProps = {

};

//export default withStyle(style)(Donate)
export default Donate