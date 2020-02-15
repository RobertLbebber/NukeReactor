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

export class PageBuilderLocale extends React.Component {
  render() {
    return <LocaleProvider>{localeContext => <PageBuilder lT={localeContext.tree} {...this.props} />}</LocaleProvider>;
  }
}

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
                  // this.savePage(editor.getCurrent());
                  this.props.onPublish(editor.getCurrent());
                },
                className: "fa fa-upload",
                attributes: { title: _.get(lT, "pages.PageBuilder.ActionButtons.Publish", "Publish Work") },
              },
              {
                active: false,
                command: editor => {
                  console.log(editor);
                  // this.savePage(editor.getCurrent());
                  this.props.onSave(editor.getCurrent());
                },
                className: "fa fa-save",
                attributes: { title: _.get(lT, "pages.PageBuilder.ActionButtons.Save", "Save Work") },
              },
              {
                active: false,
                command: editor => {
                  console.log(editor);
                  // this.savePage(editor.getCurrent());
                  this.props.onRefresh();
                },
                className: "fa fa-refresh",
                attributes: { title: _.get(lT, "pages.PageBuilder.ActionButtons.Refresh", "Refresh") },
              },
            ],
          },
          // {
          //   id: "Save",
          //   visible: true,
          //   buttons: [
          //   ],
          // },
          // {
          //   id: "Refresh",
          //   visible: true,
          //   buttons: [
          //   ],
          // },
        ]}
      />
    );
  }
}

PageBuilder.propTypes = {
  className: PropTypes.string,
  account: State.Debug ? PropTypes.object : PropTypes.object.isRequired,
  onSave: PropTypes.func,
  onPublish: PropTypes.func,
  onRefresh: PropTypes.func,
};

PageBuilder.defaultProps = {
  className: "",
  onSave: () => {},
  onPublish: () => {},
  onRefresh: () => {},
};
export default PageBuilder;
