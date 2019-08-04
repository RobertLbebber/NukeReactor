import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { fade, withStyles } from "@material-ui/core/styles";
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import * as Keys from "../../util/io/KeyCode.json";
import { ifNil, ifThenNil } from "../../util/func/func.jsx";

const styles = theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(0),
      marginBottom: theme.spacing(0),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    borderRadius: "4px",
    backgroundColor: theme.palette.white,
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    },
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 520,
      "&:focus": {
        width: 520
      }
    }
  },
  open: {
    borderBottomRightRadius: "0px",
    borderBottomLeftRadius: "0px",
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    borderBottomColor: "#ddd"
  }
});

/**
 *  TODO Documentation
 */
class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = { value: null };
    this._tag = this.constructor.name;
    this._isMount = false;
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this._isMount = true;
  }

  componentWillUnmount() {
    this._isMount = false;
  }

  onChange(e) {
    this.setState({ value: e.currentTarget.value });
    this.props.onChange(e);
  }

  render() {
    const { classes } = this.props;
    return (
      <form
        className={classes.search}
        onSubmit={e => {
          e.preventDefault();
          this.props.onSearch(e, this.state.value);
        }}
      >
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          onChange={this.onChange}
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: [ifThenNil(this.props.showResults, classes.open) + " ", " " + classes.inputInput]
          }}
          inputProps={{ "aria-label": "Search" }}
        />
      </form>
    );
  }
}

Searchbar.propTypes = {
  className: PropTypes.string,
  onSearch: PropTypes.func,
  showResults: PropTypes.bool
  //@See https://material-ui.com/api/input-base/
};

Searchbar.defaultProps = {
  className: ""
};
export default withStyles(styles)(Searchbar);
