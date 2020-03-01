import React, { Component } from "react";
import PropTypes from "prop-types";

class HeaderProfileContent extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div id="header-profile-custom-popover-content">
                <div className="slds-m-around_medium">
                    <div className="slds-tile slds-tile_board slds-m-horizontal_small">
                        <p className="tile__title slds-text-heading_small">{this.props.userName}</p>
                        <div className="slds-tile__detail">
                            <p className="slds-truncate">
                                <a
                                    className="slds-m-right_medium"
                                    href="javascript:void(0)"
                                    onClick={this.props.onSettings}
                                >
                                    Settings
						        </a>
                                <a href="javascript:void(0)" onClick={this.props.destroySession}>
                                    Log Out
						        </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

HeaderProfileContent.propTypes = {
    userName: PropTypes.string.isRequired,
    onSettings: PropTypes.func.isRequired,
    destroySession: PropTypes.func.isRequired,
}
HeaderProfileContent.defaultProps = {}


export default HeaderProfileContent