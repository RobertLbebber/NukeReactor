import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { withStyles, Modal, Fade, Backdrop, TextField, Switch, Button, FormControlLabel } from "@material-ui/core";
import LocaleContext from "Context/LocaleContext";

const styles = theme => ({});
const LOCALE_PATH = {
  PageName: "pages.Account.Page.Create.Publish.Modal.PageName",
  IsHomePage: "pages.Account.Page.Create.Publish.Modal.IsHomePage",
  IsLive: "pages.Account.Page.Create.Publish.Modal.IsLive",
  Submit: "common.Buttons.Submit",
};

class AccountPublishModal extends Component {
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
              <Fade in={this.state.showPublishModal}>
                <TextField
                  value={this.state.pageName}
                  name="pageName"
                  label={_.get(locale, LOCALE_PATH.IsPageName, "Page Name")}
                  variant="outlined"
                ></TextField>
                <FormControlLabel
                  control={<Switch checked={this.state.isHomePage} name="isHomePage" />}
                  label={_.get(locale, LOCALE_PATH.IsHomePage, "Make Home Page")}
                ></FormControlLabel>
                <FormControlLabel
                  control={<Switch checked={this.state.isLive} name="isLive" />}
                  label={_.get(locale, LOCALE_PATH.IsLive, "Go Live")}
                />
                <Button
                  name="submit"
                  onClick={() => {
                    this.props.onSubmit(this.state);
                  }}
                >
                  {_.get(locale, LOCALE_PATH.Submit, "Submit")}
                </Button>
                <Button name="close" onClick={this.props.closeModal}>
                  {_.get(locale, LOCALE_PATH.Submit, "Close")}
                </Button>
              </Fade>
            </Modal>
          )}
        </LocaleContext.Provider>
      </div>
    );
  }
}

AccountPublishModal.propTypes = {
  formData: PropTypes.shape({
    pageName: PropTypes.string,
    isHomePage: PropTypes.bool,
    isLive: PropTypes.bool,
  }),
  className: PropTypes.string,
  classes: PropTypes.object,
};

AccountPublishModal.defaultProps = {
  className: "",
  classes: "",
};
export default withStyles(styles)(AccountPublishModal);
