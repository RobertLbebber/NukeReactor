import React, { Component } from "react";
// import _ from "lodash";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Avatar, Grid } from "@material-ui/core";

import { SearchResultShape } from "./SearchOperator";
import { ifThen } from "../../../../util/func/lodashExtension";

const styles = theme => ({});

/**
 *  TODO Documentation
 */

class SearchItem extends Component {
  constructor(props) {
    super(props);
    this._tag = this.constructor.name;
  }

  render() {
    return (
      <Grid container className={this._tag + " " + this.props.className} spacing={0} onClick={this.props.onClick}>
        {ifThen(
          <Grid item xs={3}>
            <Avatar alt={this.props.imageAlt} src={this.props.imageLocation} />
          </Grid>
        )}
        <Grid item xs>
          {ifThen(
            this.props.title,
            <Grid item>
              <Typography variant="h3" id="modal-title">
                {this.props.title}
              </Typography>
            </Grid>
          )}
          {ifThen(
            this.props.subtitle,
            <Grid item>
              <Typography variant="h6">{this.props.subtitle}</Typography>
            </Grid>
          )}
          {ifThen(
            this.props.message,
            <Grid item>
              <Typography variant="subtitle1">{this.props.message}</Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  }
}

SearchItem.propTypes = SearchResultShape;

SearchItem.defaultProps = {
  title: null,
  subtitle: null,
  message: "This is a result",
  imageLocation: null,
  imageAlt: null,
  onClick: () => {}
};
export default withStyles(styles)(SearchItem);
