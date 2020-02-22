import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { withStyles, Modal, Fade, Backdrop, TextField, Switch, Button, FormControlLabel } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import LocaleContext from "Context/LocaleContext";

const styles = theme => ({});
const LOCALE_PATH = {
  LoadMessage: "pages.Account.Page.Create.Load.Modal.Message",
  WarningMessage: "pages.Account.Page.Create.Load.Modal.Warning",
  Delete: "common.Buttons.Delete",
};

class AccountLoadModal extends Component {
  constructor(props) {
    super(props);
    this.state = props.formData;
    this._tag = this.constructor.name;
    this._isMount = false;
  }

  componentDidMount() {
    this._isMount = true;
  }

  componentDidUpdate(prevProps) {}

  componentWillUnmount() {
    this._isMount = false;
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className={this._tag + " " + this.props.className}>
        <LocaleContext.Provider>
          {locale => (
            <Modal
              open={this.props.showModal}
              onClose={this.props.closeModal}
              BackdropComponent={Backdrop}
              BackdropProps={{ timeout: 500 }}
              closeAfterTransition
            >
              <Fade in={this.props.showModal}>
                {this.props.unsavedChanges && <FormattedMessage id={LOCALE_PATH.WarningMessage} />}
                <FormattedMessage id={LOCALE_PATH.LoadMessage} />

                <FormControlLabel
                  control={<Switch checked={this.state.isLive} name="isLive" />}
                  label={_.get(locale, LOCALE_PATH.IsLive, "Go Live")}
                />
                <Button
                  name="load"
                  onClick={() => {
                    this.props.onSubmit(this.state);
                  }}
                >
                  {_.get(locale, LOCALE_PATH.Load, "Load Page")}
                </Button>
              </Fade>
            </Modal>
          )}
        </LocaleContext.Provider>
      </div>
    );
  }
}

AccountLoadModal.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,

  showModal: PropTypes.bool,
  presets: PropTypes.object,
  unsaveChanges: PropTypes.bool,
  createdPages: PropTypes.object,
  closeModal: PropTypes.func,
  onSubmit: PropTypes.func, // Load
};

AccountLoadModal.defaultProps = {
  className: "",
  classes: "",
  showModal: false,
  closeModal: () => {},
  onSubmit: () => {},
};
export default withStyles(styles)(AccountLoadModal);
