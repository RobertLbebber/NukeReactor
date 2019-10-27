import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Grid, Link, Typography } from "@material-ui/core";
import { AccountShape } from "../../Context/HeartbeatContext";
import { PAGE_NOT_FOUND } from "../../Pages/Public/Page404";
import { getAccountPath } from "../../util/io/UserAPIs";

const styles = theme => ({});

/**
 *  TODO Documentation
 */

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._tag = this.constructor.name;
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
      <Paper className={this._tag + " " + this.props.className}>
        <Grid container>
          {/* Header */}
          <Grid item xs={2}>
            <Link href={_.get(poster, "accountPage", PAGE_NOT_FOUND)} underline="none" color="textSecondary">
              >
              <Avatar
                className={classes.profileAvatar}
                alt={_.get(poster, "firstName", ["#"])[0]}
                src={getProfileImage(_.get(poster, "id"), _.get(poster, "profileImg"))}
              />
              <Typography variant="h5" component="h5">
                <Link href={getAccountPath({ id: _.get(poster, "id") })}>
                  {_.get(poster, "firstName")} {_.get(poster, "lastName")}
                </Link>
              </Typography>
              <Typography variant="h5" component="h5">
                {_.get(this.props.postData, "date")}
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5" component="h5">
              {this.props.postData.title}
            </Typography>
            <Typography variant="subtite" component="subtite">
              {this.props.subtitle}
            </Typography>
          </Grid>
        </Grid>
        {this.state._tag}
      </Paper>
    );
  }
}

export const postShape = PropTypes.shape({
  title: PropTypes.string,
  subtitle: PropTypes.string,
  date: PropTypes.number,
  description: PropTypes.string,
  attachments: PropTypes.object
});

Post.propTypes = {
  poster: AccountShape,
  postData: postShape,
  className: PropTypes.string,
  classes: PropTypes.object
};

Post.defaultProps = {
  className: ""
};
export default withStyles(styles)(Post);
