import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";

import ComponentPlus from "../../../general/Util/ComponentPlus";
import { Details } from "../../../env/InterpretedEnvironment";
import { Button, ButtonGroup } from "@material-ui/core";

const styles = theme => ({});

/**
 *  TODO Documentation
 */

class Footer extends ComponentPlus {
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
      <ButtonGroup>
        {_.map(this.props.footerLinks, (link, key) => (
          <Button onClick={this.props.fireRedirect(link)} name={key}>
            <FormattedMessage id={"pages.Navibars.Footer." + key} />
          </Button>
        ))}
        @ {Details.TRADEMARK} {Details.COMPANY_NAME}
        <br />
        {Details.SLOGAN}
      </ButtonGroup>
    );
  }
}

Footer.propTypes = {
  className: PropTypes.string,
  fireRedirect: PropTypes.func
};

Footer.defaultProps = {
  className: ""
};
export default withStyles(styles)(Footer);
