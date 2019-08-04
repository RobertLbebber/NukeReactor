import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import SearchItem from "./SearchItem";

const styles = theme => ({
  root: {
    position: "relative"
  },
  paper: {
    borderTopRightRadius: "0px",
    borderTopLeftRadius: "0px",
    position: "absolute",
    top: 36,
    right: 0,
    left: 0
  }
});

/**
 *  TODO Documentation
 */
class SearchResult extends Component {
  constructor(props) {
    super(props);
    this._tag = this.constructor.name;
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <div className={this._tag + " " + this.props.className}>
          <Grid container {...this.props.gridProps}>
            {_.map(this.props.results, (result, index) => {
              if (!_.isNil(this.props.rowComponent)) {
                return this.props.rowComponent(result, index);
              } else {
                return <SearchItem key={index} {...result} />;
              }
            })}
          </Grid>
        </div>
      </Paper>
    );
  }
}

SearchResult.propTypes = {
  className: PropTypes.string,
  results: PropTypes.array.isRequired,
  gridProps: PropTypes.object,
  rowComponent: PropTypes.func
};

SearchResult.defaultProps = {
  className: ""
};
export default withStyles(styles)(SearchResult);
