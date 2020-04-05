import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

class HeaderNotificationsContent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ul id="header-notifications-custom-popover-content">
        {_.map(this.props.items, item => (
          <li
            className={`slds-global-header__notification ${
              item.unread ? "slds-global-header__notification_unread" : ""
            }`}
            key={`notification-item-${item.id}`}
          >
            <div className="slds-media slds-has-flexi-truncate slds-p-around_x-small">
              <div className="slds-media__figure">
                <span className="slds-avatar slds-avatar_small">
                  <img
                    alt={item.name}
                    src={`${item.avatar}`}
                    title={`${item.name} avatar"`}
                  />
                </span>
              </div>
              <div className="slds-media__body">
                <div className="slds-grid slds-grid_align-spread">
                  <a
                    href="javascript:void(0);"
                    className="slds-text-link_reset slds-has-flexi-truncate"
                  >
                    <h3
                      className="slds-truncate"
                      title={`${item.name} ${item.action}`}
                    >
                      <strong>{`${item.name} ${item.action}`}</strong>
                    </h3>
                    <p className="slds-truncate" title={item.comment}>
                      {item.comment}
                    </p>
                    <p className="slds-m-top_x-small slds-text-color_weak">
                      {item.timePosted}{" "}
                      {item.unread && (
                        <abbr
                          className="slds-text-link slds-m-horizontal_xxx-small"
                          title="unread"
                        >
                          ●
                        </abbr>
                      )}
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

HeaderNotificationsContent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      action: PropTypes.string,
      avatar: PropTypes.string,
      comment: PropTypes.string,
      id: PropTypes.string,
      name: PropTypes.string,
      timePosted: PropTypes.string,
      unread: PropTypes.bool
    }).isRequired
  )
};
HeaderNotificationsContent.defaultProps = {};
export default HeaderNotificationsContent;
