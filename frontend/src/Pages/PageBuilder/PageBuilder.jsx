import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import "./GrapeJs.css";
import GEditor from "./components/GEditor";
import "grapesjs/dist/css/grapes.min.css";
// import Restful from "../../util/io/Restful";
// import toastr from "toastr";
import { State } from "env/InterpretedEnvironment";
import LocaleProvider from "Context/LocaleContext";
import { withStyles } from "@material-ui/core";

export class PageBuilderLocale extends React.Component {
  render() {
    return <LocaleProvider>{localeContext => <PageBuilder lT={localeContext.tree} {...this.props} />}</LocaleProvider>;
  }
}

const styles = theme => {};

class PageBuilder extends React.Component {
  constructor(props) {
    super(props);
    let currenAccount = State.Debug ? { id: 1 } : props.account;
    //TODO add urls
    this.state = {
      // loading: true,
      storageManager: {
        type: "remote",
        stepsBeforeSave: 3,
        // urlStore: Endpoints.save(currenAccount.id, 1).url,
        // urlLoad: Endpoints.load(currenAccount.id, 1).url,
        // For custom parameters/headers on requests
        params: { _some_token: "...." },
        headers: { Authorization: "Basic ..." },
      },
    };
  }

  render() {
    let { lT } = this.props;

    return (
      <GEditor
        id="geditor"
        storageManager={this.state.storageManager}
        panels={[
          {
            id: "Publish left-0",
            visible: true,
            buttons: [
              {
                active: false,
                command: editor => {
                  console.log(editor);
                  this.props.onRefresh();
                },
                className: "fa fa-refresh",
                attributes: { title: _.get(lT, "pages.PageBuilder.ActionButtons.Refresh", "Refresh") },
              },
              {
                active: false,
                command: editor => {
                  console.log(editor);
                  this.props.onPublish(editor.getComponents());
                },
                className: "fa fa-upload",
                attributes: { title: _.get(lT, "pages.PageBuilder.ActionButtons.Publish", "Publish Work") },
              },
              {
                active: false,
                command: editor => {
                  console.log(editor);
                  this.props.onSave(editor.getComponents());
                },
                className: "fa fa-save",
                attributes: { title: _.get(lT, "pages.PageBuilder.ActionButtons.Save", "Save Work") },
              },
              {
                active: false,
                command: editor => {
                  this.props.onLoad();
                },
                className: "fa fa-load",
                attributes: { title: _.get(lT, "pages.PageBuilder.ActionButtons.Load", "Load Page") },
              },
              {
                active: false,
                command: editor => {
                  this.props.onNew();
                },
                className: "fa fa-plus",
                attributes: { title: _.get(lT, "pages.PageBuilder.ActionButtons.New", "New Page") },
              },
              {
                active: false,
                command: editor => {
                  this.props.onDelete();
                },
                className: "fa fa-trash",
                attributes: { title: _.get(lT, "pages.PageBuilder.ActionButtons.Delete", "Delete Page") },
              },
            ],
          },
        ]}
        {...this.props}
      />
    );
  }
}

PageBuilder.propTypes = {
  className: PropTypes.string,
  account: State.Debug ? PropTypes.object : PropTypes.object.isRequired,
  onSave: PropTypes.func,
  onPublish: PropTypes.func,
  onNew: PropTypes.func,
  onDelete: PropTypes.func,
  onLoad: PropTypes.func,
  onRefresh: PropTypes.func,
};

PageBuilder.defaultProps = {
  className: "",
  onSave: currentPage => {},
  onPublish: currentPage => {},
  onLoad: currentPage => {},
  onDelete: currentPage => {},
  onNew: currentPage => {},
  onRefresh: () => {},
};
export default withStyles(styles)(PageBuilder);
