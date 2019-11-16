import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import _ from "lodash";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Avatar } from "@material-ui/core";

import { AccountShape } from "Context/HeartbeatContext";
import { getAccountPath } from "util/io/UserAPIs";
import { getLocal } from "util/func/localization";
import ReactionBar, { DONATE, SHARE, NONE, DISLIKE, LIKE } from "../Feedback/ReactionBar";

const styles = theme => ({
  profileImage: { margin: theme.spacing(2) },
  profile: { cursor: "pointer", textAlign: "left", alignItems: "center" },
  notSpecialLink: {
    color: theme.text.secondary.color,
    marginTop: theme.spacing(1),
    textDecoration: "none"
  },
  nameText: {
    fontWeight: 800,
    marginTop: theme.spacing(2)
  }
});

/**
 *  TODO Documentation
 */
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likeStatus: _.get(this.props.postData, "reactions.likeStatus", NONE),
      hasDonated: _.get(this.props.postData, "reactions.donateData.hasDonated", false),
      hasShared: _.get(this.props.postData, "reactions.shareData.hasShared", false)
    };
    this._tag = this.constructor.name;
    this._isMount = false;
  }

  componentDidMount() {
    this._isMount = true;
  }

  componentWillUnmount() {
    this._isMount = false;
  }

  handleLikeChange = value => {
    console.log(value);
    this.setState({ likeStatus: value });
    this.props.onLikeStatusChange(value);
  };

  handleTermChange = event => {
    let name = event.currentTarget.name;
    this.setState(
      prevState => {
        if (name === _.startCase(SHARE)) {
          return { hasShared: !prevState.hasShared };
        } else {
          return { hasDonated: !prevState.hasDonated };
        }
      },
      () => {
        if (name === _.startCase(SHARE)) {
          this.props.onShare(this.state.hasShared);
        } else {
          this.props.onDonate(this.state.hasDonated);
        }
      }
    );
  };

  renderProfile(poster, classes) {
    let posterImage = _.get(poster, "profileImg");
    return (
      <Grid container item xs={12} justify="flex-start" className={classes.profile}>
        <Grid item xs={2}>
          <Link to={getAccountPath({ id: _.get(poster, "id") })} className={classes.notSpecialLink}>
            <Avatar
              component="span"
              className={classes.profileImage}
              alt={_.get(poster, "firstName", ["#"])[0]}
              src={posterImage}
            />
          </Link>
        </Grid>
        <Grid item xs={10}>
          <Typography variant="body1">
            <Link
              to={getAccountPath({ id: _.get(poster, "id") })}
              className={classes.notSpecialLink + " " + classes.nameText}
            >
              {_.get(poster, "firstName")} {_.get(poster, "lastName")}
            </Link>
          </Typography>
          <FormattedMessage id="_id">
            {lang => (
              <Typography variant="body2">
                <Link to={getAccountPath({ id: _.get(poster, "id") })} className={classes.notSpecialLink}>
                  {getLocal(lang, _.get(this.props.postData, "date"))}
                </Link>
              </Typography>
            )}
          </FormattedMessage>
        </Grid>
      </Grid>
    );
  }

  renderContent() {
    return (
      <Grid item xs={12}>
        <Typography variant="h5">{this.props.postData.title}</Typography>
        <Typography variant="body1">{this.props.postData.subtitle}</Typography>
      </Grid>
    );
  }

  render() {
    let { poster, classes } = this.props;
    let feedList = [
      { key: DONATE, active: this.state.hasDonated, disabled: false, value: NaN, onClick: () => null },
      { key: SHARE, active: this.state.hasShared, disabled: false, value: NaN, onClick: () => null }
    ];
    // console.log(feedList);
    return (
      <Paper className={this._tag + " " + this.props.className}>
        <Grid container direction="column">
          {/* Header */}
          {this.renderProfile(poster, classes)}
          {this.renderContent(poster, classes)}
          <Grid container>
            <ReactionBar
              feedList={feedList}
              likeState={this.state.likeStatus}
              onLikeChange={this.handleLikeChange}
              onTermChange={this.handleTermChange}
            />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export const DonationStatusShape = PropTypes.shape({
  donated: PropTypes.number,
  hasDonated: PropTypes.bool,
  totalDonations: PropTypes.number
});
export const SharedStatusShape = PropTypes.shape({ shares: PropTypes.number, hasShared: PropTypes.bool });
export const ReationsShape = PropTypes.shape({
  likesStatus: PropTypes.oneOf([LIKE, DISLIKE, NONE]),
  shareData: SharedStatusShape,
  donateData: DonationStatusShape
});
export const postShape = PropTypes.shape({
  title: PropTypes.string,
  subtitle: PropTypes.string,
  date: PropTypes.number,
  description: PropTypes.string,
  attachments: PropTypes.object,
  reactions: ReationsShape
});

Post.propTypes = {
  poster: AccountShape,
  account: AccountShape,
  postData: postShape,
  className: PropTypes.string,
  classes: PropTypes.object,

  onLikeStatusChange: PropTypes.func,
  onDonate: PropTypes.func,
  onShare: PropTypes.func
};

Post.defaultProps = {
  className: "",
  onLikeStatusChange: () => {},
  onDonate: () => {},
  onShare: () => {}
};
export default withStyles(styles)(Post);
