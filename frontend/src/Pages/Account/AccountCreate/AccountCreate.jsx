import React, { Component } from "react";
import PropTypes from "prop-types";
import toastr from "toastr";
import { withStyles, Modal, Fade, Backdrop, TextField, Switch } from "@material-ui/core";
import _ from "lodash";
import { Redirect } from "react-router-dom";

import { PageBuilderLocale } from "Pages/PageBuilder/PageBuilder";
import Loading from "general/Feedback/Graphics/Loading";
import Restful from "util/io/Restful";
import AccountLoadModal from "Pages/Account/AccountCreate/AccountLoadModal/AccountLoadModal";
import AccountDeleteModal from "Pages/Account/AccountCreate/AccountDeleteModal/AccountDeleteModal";
import AccountPublishModal from "Pages/Account/AccountCreate/AccountPublishModal/AccountPublishModal";
import { PAGE_UNAVAILABLE } from "Pages/Public/Page503";

const styles = theme => {
  return {
    loading: {
      backgroundColor: theme.palette.primary.hvr,
      top: "auto",
      bottom: 0,
    },
  };
};

const MODAL_TYPE = { PUBLISH: "publish", DELETE: "delete", LOAD: "load" };

export class AccountCreate extends Component {
  constructor(props) {
    super(props);
    this._mounted = false;
    this._tag = this.constructor.name;
    this.state = {
      loading: true,
      unsaveChanges: false,
      currentPage: null,
      presets: null,
      pageId: "",
      error: null,
      account: { ...this.props.body },
      subscribed: false,
      redirect: null,
    };
    this.goSave = this.goSave.bind(this);
    this.goLoad = this.goLoad.bind(this);
    this.goPublish = this.goPublish.bind(this);
    this.goLoadPreset = this.goLoadPreset.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.goLoadAllMeta = this.goLoadAllMeta.bind(this);

    this.goLoad();
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  goLoadPreset() {
    Restful.post(`account/page/presets`).then(response => {
      if (this._mounted) {
        if (response.ok) {
          this.setState({ presets: response.body, loading: false });
        } else {
          toastr.error("There was an error reaching the server", "Failed to Load Presets");
        }
      }
    });
  }

  goLoadAllMeta() {
    Restful.get(`account/${this.state.account.id}/loadAll`).then(response => {
      if (this._mounted) {
        let newState = {};
        if (response.ok) {
          newState = { createdPages: response.body, loading: false };
        } else {
          newState = { error: response.body, loading: false };
        }
        this.setState(newState);
      }
    });
  }

  goLoad(pageId = "") {
    Restful.get(`account/${this.state.account.id}/page/${pageId}`).then(response => {
      if (this._mounted) {
        let newState = {};
        if (response.ok) {
          newState = { currentPage: response.body, loading: false };
        } else if (_.isNaN(response.status)) {
          newState = { redirect: PAGE_UNAVAILABLE, loading: false };
        } else {
          newState = { error: response.body, loading: false };
        }
        this.setState(newState);
      }
    });
  }

  goPublish(pageMeta, pageId = "") {
    this.setState({ loading: true, unsavedChanges: false });
    Restful.post(`account/${this.state.account.id}/page/${pageId}`, {
      pageContent: this.state.currentPage,
      pageMeta,
    }).then(response => {
      if (this._mounted) {
        if (response.ok) {
          toastr.success("Page may take time to go live", "Successful Published");
          this.setState({ loading: false });
        } else {
          toastr.error("There was an error reaching the server", "Failed to Publish");
        }
      }
    });
  }

  goSave(savePage, pageId = "") {
    this.setState({ loading: true, unsavedChanges: false, currentPage: savePage });
    Restful.put(`account/${this.state.account.id}/page/${pageId}`, {
      pageContent: savePage,
      pageMeta: { pageName: "", pageCategory: "" },
      makeHomePage: false,
    }).then(response => {
      if (this._mounted) {
        if (response.ok) {
          toastr.success("Current page has been saved", "Successfully Save");
        } else {
          toastr.error("There was an error reaching the server", "Failed to Save");
        }
      }
    });
  }

  goDelete(savePage, pageId = "") {
    this.setState({ loading: true, unsavedChanges: false, currentPage: savePage });
    Restful.deleter(`account/${this.state.account.id}/page/${pageId}`, {
      pageContent: savePage,
      pageMeta: { pageName: "", pageCategory: "" },
      makeHomePage: false,
    }).then(response => {
      if (this._mounted) {
        if (response.ok) {
          toastr.success("Current page has been saved", "Successfully Save");
          this.setState({ redirect: _.get(response, "body.redirect") });
        } else {
          toastr.error("There was an error reaching the server", "Failed to Save");
        }
      }
    });
  }

  handleChange(changePage) {
    if (this._mounted && _.isEqual(this.state.currentPage, changePage)) {
      this.setState({ unsavedChanges: true, changePage }); // Unsaved Changes refers to remote storage
    }
  }

  handlePublish(publishPage) {
    this.setState({ showModal: MODAL_TYPE.PUBLISH, currentPage: publishPage });
  }

  handleLoadModal() {
    this.setState({ showModal: MODAL_TYPE.LOAD, loading: true });
    this.goLoadPreset();
    this.goLoadAllMeta();
  }

  handleDeleteModal() {
    this.setState({ showModal: MODAL_TYPE.DELETE });
  }

  closeModal() {
    this.setState({ showModal: null });
  }

  renderModal() {
    switch (this.state.modalContent) {
      case MODAL_TYPE.DELETE:
        return (
          <AccountDeleteModal
            unsaveChanges={this.state.unsaveChanges}
            closeModal={this.closeModal}
            onSubmit={this.goDelete}
          />
        );
      case MODAL_TYPE.LOAD:
        return (
          <AccountLoadModal
            unsaveChanges={this.state.unsaveChanges}
            presets={this.state.presets}
            createdPages={this.state.createdPages}
            closeModal={this.closeModal}
          />
        );
      case MODAL_TYPE.PUBLISH:
        return (
          <AccountPublishModal
            formData={this.state.pageMeta}
            onSubmit={this.publishChanges}
            unsaveChanges={this.state.unsaveChanges}
            closeModal={this.closeModal}
          />
        );
      case null:
      case undefined:
        return;
      default:
        console.error("Invalid Modal Type Attempted to be Rendered: " + this.state.modalContent);
    }
  }

  render() {
    let renderContent;
    if (_.isNil(this.state.currentPage)) {
      if (this.state.loading) {
        renderContent = <Loading className="center-container" />;
      } else {
        renderContent = "ERROR MESSAGE"; //TODO fill this bit in
      }
    } else {
      renderContent = (
        <PageBuilderLocale
          isLoading={this.state.loading}
          onSave={this.saveChanges}
          onPublish={this.publishChanges}
          onChange={this.handleChange}
          onLoad={this.handleLoad}
          onDelete={this.handleDelete}
        />
      );
    }
    return (
      <div className={this._tag}>
        {renderContent}
        {this.renderModal()}
        {!_.isEmpty(this.state.redirect) && <Redirect to={this.state.redirect} />}
      </div>
    );
  }

  static propTypes = {};

  static defaultProps = {};
}
export default withStyles(styles)(AccountCreate);
