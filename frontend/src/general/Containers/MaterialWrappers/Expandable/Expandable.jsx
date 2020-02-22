import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import { pop } from "util/func/jsonUtil";

const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

class Expandable extends Component {
  constructor(props) {
    super(props);
    this._tag = this.state.contructor;
    this.state = {
      show: [],
    };
  }

  handleChange = key => () => {
    this.setState(prevState => {
      let safeShow = _.clone(prevState.show);
      let index = _.indexOf(safeShow, key);
      if (index === -1) {
        safeShow.push(key);
      } else {
        pop(safeShow, index);
      }
      return {};
    });
  };

  render() {
    return (
      <div className={this._tag}>
        {_.map(this.props.sections, (value, key) => (
          <ExpansionPanel square expanded={this.state.show.includes(key)} onChange={this.handleChange(key)}>
            <ExpansionPanelSummary>
              <Typography>{epSummary}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>{epDetails}</ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}
export default Expandable;
