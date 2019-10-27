import React from "react";
import PropTypes from "prop-types";
// import _ from "lodash";
import "./App.css";
import GEditor from "./components/GEditor";
import "grapesjs/dist/css/grapes.min.css";
// import Restful from "../../util/io/Restful";
// import toastr from "toastr";
import { State } from "../../env/InterpretedEnvironment";
import Endpoints from "./Endpoints/Endpoints";

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
        urlStore: Endpoints.save(currenAccount.id, 1).url,
        urlLoad: Endpoints.load(currenAccount.id, 1).url,
        // For custom parameters/headers on requests
        params: { _some_token: "...." },
        headers: { Authorization: "Basic ..." }
      }
    };
  }

  // savePage(content = content ? content : this.state.apiCurrent) {
  //   this.setState({ loading: true });
  //   Restful.post(this.urls.save, this.state.apiCurrent)
  //     .then(response => {
  //       if (response.ok) {
  //         toastr.success("Page may take time to go live", "Successful Published");
  //       } else {
  //         //TODO
  //         toastr.success("Page may take time to go live", "Other Message");
  //       }
  //       this.setState({ loading: false });
  //     })
  //     .catch(error => {
  //       toastr.error("There was an error reaching the server", "Failed to Publish");
  //       this.setState({ loading: false });
  //     });
  // }

  // getPage() {
  //   this.setState({ loading: true });
  //   Restful.get(this.urls.get)
  //     .then(response => {
  //       if (response.ok) {
  //         //   toastr.success("Page may take time to go live", "Successful Published");
  //       } else {
  //         //TODO
  //         //   toastr.success("Page may take time to go live", "Other Message");
  //       }
  //       this.setState({ loading: false });
  //     })
  //     .catch(error => {
  //       toastr.error("There was an error reaching the server", "Failed to Publish");
  //       this.setState({ loading: false });
  //     });
  // }

  render() {
    return (
      <GEditor
        id="geditor"
        storageManager={this.state.storageManager}
        panels={
          [
            // {
            //   id: "Publish",
            //   visible: true,
            //   buttons: [
            //     {
            //       active: true,
            //       command: editor => {
            //         console.log(editor.getCurrent());
            //         this.savePage(editor.getCurrent());
            //       },
            //       className: "fa fa-save",
            //       attributes: { title: "Publish Work" }
            //     }
            //   ]
            // }
          ]
        }
      />
    );
  }
}
PageBuilder.propTypes = {
  className: PropTypes.string,
  account: State.Debug ? PropTypes.object : PropTypes.object.isRequired
};

PageBuilder.defaultProps = {
  className: ""
};
export default PageBuilder;
