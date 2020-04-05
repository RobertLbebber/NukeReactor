import React, { Component } from "react"
import { Fab } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
//import PropTypes from "prop-types"
//import _ from "lodash"

//import Restful from "util/io/Restful"
//import {} from "@salesforce/design-system-react";
//import {} from "@material-ui/core";

//const style=theme=>{
//    return {
//    }
//}

class BackButton extends Component {
    constructor(props) {
        super(props);
        this._tag = this.constructor.name
        //this.=this.bind(this);
        //this.state={}
    }

    render() {
        return (
            <FormattedMessage id="common.Button.Back">
                {(locale) => (
                    <Fab onClick={window.history.back} className={this._tag}>{locale}</Fab>
                )}
            </FormattedMessage>
        )
    }
}

BackButton.propTypes = {
    //    className: PropTypes.string,
    //    classes: PropTypes.object,
}

BackButton.defaultProps = {

};

//export default withStyle(style)(BackButton)
export default BackButton
