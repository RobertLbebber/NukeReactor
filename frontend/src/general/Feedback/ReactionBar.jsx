import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { IconButton, ButtonGroup, Grid, Popover, Typography } from "@material-ui/core";
import { FormattedHTMLMessage } from "react-intl";
import { ThumbUpOutlined, ThumbDownOutlined, ShareOutlined, PaymentOutlined } from "@material-ui/icons";
import ShareOptions from "./ShareOptions";
import DonateOptions from "./DonateOptions";

const styles = theme => ({
  [DISLIKE]: {
    "&.active": {
      color: theme.status.danger.main
    }
  },
  [LIKE]: {
    "&.active": {
      color: theme.status.success.main
    }
  },
  [SHARE]: {
    "&.active": {
      color: theme.status.warn.main
    }
  },
  [DONATE]: {
    "&.active": {
      color: theme.status.success.main
    }
  }
  //Other Supported Reactions
});

export const DONATE = "donate";
export const SHARE = "share";
export const LIKE = "like";
export const DISLIKE = "dislike";
export const NONE = "none";
export const SupportedStatus = {
  [SHARE]: { component: <ShareOutlined />, id: "common.Buttons.Share" },
  [DONATE]: { component: <PaymentOutlined />, id: "common.Buttons.Donate" }
};

/**
 *  TODO Documentation
 */
class ReactionBar extends Component {
  constructor(props) {
    super(props);
    this.state = { show: { name: null } };
  }

  hideAll = () => {
    this.setState({ show: { name: null } });
  };

  renderSharesButton = (classes, fn, { disabled, active, value, key, onClick }) => (
    <React.Fragment>
      <FormattedHTMLMessage id={SupportedStatus[SHARE].id}>
        {langauge => (
          <IconButton
            className={classes[SHARE] + (active ? " active" : "")}
            name={SHARE}
            onClick={event => {
              this.setState({ show: event.currentTarget });
            }}
            disabled={disabled}
            title={langauge}
            value={active}
          >
            {SupportedStatus[SHARE].component}
          </IconButton>
        )}
      </FormattedHTMLMessage>
      <Popover
        id={key}
        open={this.state.show.name === SHARE}
        anchorEl={this.state.show}
        onClose={this.hideAll}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
      >
        <Typography className={classes.typography}>
          <ShareOptions onClick={onClick} />
        </Typography>
      </Popover>
    </React.Fragment>
  );

  renderDonationsButton = (classes, fn, { disabled, active, value, key, onClick }) => (
    <React.Fragment>
      <FormattedHTMLMessage id={SupportedStatus[DONATE].id}>
        {langauge => (
          <IconButton
            className={classes[DONATE] + (active ? " active" : "")}
            name={DONATE}
            onClick={event => {
              this.setState({ show: event.currentTarget });
            }}
            disabled={disabled}
            title={langauge}
            value={active}
          >
            {SupportedStatus[DONATE].component}
          </IconButton>
        )}
      </FormattedHTMLMessage>
      <Popover
        id={key}
        open={this.state.show.name === DONATE}
        anchorEl={this.state.show}
        onClose={this.hideAll}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
      >
        <Typography className={classes.typography}>
          <DonateOptions onClick={onClick} />
        </Typography>
      </Popover>
    </React.Fragment>
  );

  render() {
    let { classes, feedList, likeState, onLikeChange, onTermChange } = this.props;
    return (
      <React.Fragment>
        <Grid xs={4} item>
          <ButtonGroup>
            {this.renderDonationsButton(classes, onTermChange, _.find(feedList, item => item.key === DONATE))}
            {this.renderSharesButton(classes, onTermChange, _.find(feedList, item => item.key === SHARE))}
          </ButtonGroup>
        </Grid>
        <Grid xs={4} item>
          {/** Intentional Empty Spacing */}
        </Grid>
        <Grid xs={4} item>
          <ButtonGroup>
            <IconButton
              className={classes.like + (likeState === LIKE ? " active" : "")}
              value="Like"
              onClick={() => onLikeChange(likeState === LIKE ? NONE : LIKE)}
            >
              <ThumbUpOutlined />
            </IconButton>
            <IconButton
              value="Dislike"
              className={classes.dislike + (likeState === DISLIKE ? " active" : "")}
              onClick={() => onLikeChange(likeState === DISLIKE ? NONE : DISLIKE)}
            >
              <ThumbDownOutlined />
            </IconButton>
          </ButtonGroup>
        </Grid>
      </React.Fragment>
    );
  }
}

ReactionBar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  feedList: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      active: PropTypes.bool,
      disabled: PropTypes.bool,
      value: PropTypes.number,
      onClick: PropTypes.func
    })
  ),
  likeState: PropTypes.func,
  onLikeChange: PropTypes.func,
  onTermChange: PropTypes.func
};

ReactionBar.defaultProps = {
  className: "",
  classes: "",
  likeState: () => {},
  onLikeChange: () => {},
  onTermChange: () => {}
};
export default withStyles(styles)(ReactionBar);
