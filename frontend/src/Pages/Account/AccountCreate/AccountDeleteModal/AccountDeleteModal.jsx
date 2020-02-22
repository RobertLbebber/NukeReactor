import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { withStyles, Modal, Fade, Backdrop, TextField, Switch, Button } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import LocaleContext from "Context/LocaleContext";

const styles = theme => ({});
const LOCALE_PATH = {
  DeleteMessage: "pages.Account.Page.Create.Delete.Modal.Message",
  WarningMessage: "pages.Account.Page.Create.Delete.Modal.Warning",
  Delete: "common.Buttons.Delete",
};

class AccountDeleteModal extends Component {
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
                <FormattedMessage id={LOCALE_PATH.DeleteMessage} />
                <Button name="delete" onClick={this.props.onSubmit}>
                  {_.get(locale, LOCALE_PATH.Delete, "Delete")}
                </Button>
                <Button name="cancel" onClick={this.props.closeModal}>
                  {_.get(locale, LOCALE_PATH.Cancel, "Cancel")}
                </Button>
              </Fade>
            </Modal>
          )}
        </LocaleContext.Provider>
      </div>
    );
  }
}

AccountDeleteModal.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  unsavedChanges: PropTypes.bool,
  showModal: PropTypes.bool,
  closeModal: PropTypes.func,
  onSubmit: PropTypes.func,
};

AccountDeleteModal.defaultProps = {
  className: "",
  classes: "",
  showModal: false,
  closeModal: () => {},
  onSubmit: () => {},
};
export default withStyles(styles)(AccountDeleteModal);
