import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { ClickAwayListener } from "@material-ui/core";

import Searchbar from "../../Inputs/Searchbar";
import Restful from "../../../util/io/Restful";
import { ifThenNil, ifNil } from "../../../util/func/func";
import { Debug } from "../../../util/devvar/devvar";
import SearchResult from "./SearchResult";

const styles = theme => ({
  root: {
    position: "relative"
  }
});

/**
 *  TODO Documentation
 */

class SearchOperator extends Component {
  constructor(props) {
    super(props);
    this.suggestionResult = "suggestionResult";
    this.searchResult = "searchResult";
    this.state = {
      currentSearchState: null,
      [this.suggestionResult]: null,
      [this.searchResult]: null,
      searchRequest: null,
      showSearchOrSuggest: this.suggestionResult,
      openResults: false
    };
    this._tag = this.constructor.name;
    this._isMount = false;
    this.handleGetRequest = this.handleGetRequest.bind(this);
  }

  componentDidMount() {
    this._isMount = true;
  }

  componentWillUnmount() {
    this._isMount = false;
  }

  handleClickAway = () => {
    this.setState({
      openResults: false
    });
  };

  handleGetRequest(value, stateKey) {
    if (value.length == 0) {
      this.setState({
        openResults: false,
        [stateKey]: null,
        showSearchOrSuggest: stateKey
      });
      return;
    } else if (
      (stateKey === this.searchResult && _.isNil(this.props.searchUrl)) ||
      (stateKey === this.suggestionResult && _.isNil(this.props.suggestionUrl))
    ) {
      return;
    }

    this.setState({
      [stateKey]: value,
      showSearchOrSuggest: stateKey,
      loading: true
    });

    if (Debug.ACTIVE) {
      this.setState({
        [stateKey]: [
          {
            title: "This is the title",
            subtitle: "This is the subtitle",
            message: value,
            imageLocation: "/src/assets/img/faces/faces-0.jpg",
            imageAlt: "Image Alt",
            onClick: () => {
              console.log("HI from Search Result");
            }
          },
          {
            title: "This is the title2",
            subtitle: "This is the subtitle",
            message: value,
            imageLocation: "/src/assets/img/faces/faces-0.jpg",
            imageAlt: "Image Alt",
            onClick: () => {
              console.log("HI from Search Result");
            }
          }
        ],
        openResults: true,
        loading: false
      });
    } else {
      Restful.get(this.props.searchUrl + "q=" + encodeURI(value))
        .then(response => {
          if (this._isMount && response.ok) {
            this.setState({
              [stateKey]: response.data,
              openResults: true,
              loading: false
            });
          }
        })
        .catch(error => {
          console.warn("Failed to Make requet:", error);
        });
    }
  }

  render() {
    const { classes } = this.props;
    let seaSugResults = this.state[this.state.showSearchOrSuggest];
    return (
      <div className={this._tag + " " + this.props.className + " " + classes.root}>
        <ClickAwayListener onClickAway={this.handleClickAway}>
          <React.Fragment>
            <Searchbar
              onChange={e => {
                this.handleGetRequest(e.currentTarget.value, this.suggestionResult);
              }}
              onSearch={(e, value) => {
                this.handleGetRequest(value, this.searchResult);
              }}
              showResults={ifThenNil(seaSugResults, true)}
            />
            {this.state.openResults && ifThenNil(seaSugResults, this.props.resultComponent(seaSugResults))}
          </React.Fragment>
        </ClickAwayListener>
      </div>
    );
  }
}

SearchOperator.propTypes = {
  className: PropTypes.string,
  searchUrl: PropTypes.string,
  suggestionUrl: PropTypes.string,
  resultComponent: PropTypes.func
};

SearchOperator.defaultProps = {
  className: "",
  resultComponent: results => <SearchResult results={results} />
};
export default withStyles(styles)(SearchOperator);
export const SearchResultShape = PropTypes.shape({
  title: PropTypes.string,
  subtitle: PropTypes.string,
  message: PropTypes.string,
  imageLocation: PropTypes.string,
  imageAlt: PropTypes.string,
  onClick: PropTypes.func
});
