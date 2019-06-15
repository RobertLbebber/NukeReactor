import React from "react";
import "./App.css";
import GEditor from "./components/GEditor";
import "grapesjs/dist/css/grapes.min.css";
import Restful from "../../../util/io/Restful";
import toastr from "toastr";

class PageBuilder extends React.Component {
  constructor(props) {
    super(props);
    //TODO add urls
    this.urls = {
      save: "TBD",
      get: "TBD"
    };
    this.state = {
      apiCurrent: {},
      loading: true
    };
  }

  savePage(content = content ? content : this.state.apiCurrent) {
    this.setState({ loading: true });
    Restful.post(this.urls.save, this.state.apiCurrent)
      .then(response => {
        if (response.ok) {
          toastr.success("Page may take time to go live", "Successful Published");
        } else {
          //TODO
          toastr.success("Page may take time to go live", "Other Message");
        }
        this.setState({ loading: false });
      })
      .catch(error => {
        toastr.error("There was an error reaching the server", "Failed to Publish");
        this.setState({ loading: false });
      });
  }

  getPage() {
    this.setState({ loading: true });
    Restful.get(this.urls.get)
      .then(response => {
        if (response.ok) {
          //   toastr.success("Page may take time to go live", "Successful Published");
        } else {
          //TODO
          //   toastr.success("Page may take time to go live", "Other Message");
        }
        this.setState({ loading: false });
      })
      .catch(error => {
        toastr.error("There was an error reaching the server", "Failed to Publish");
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <GEditor
        id="geditor"
        storageManager={this.state.apiCurrent}
        panels={[
          {
            id: "Publish",
            visible: true,
            buttons: [
              {
                active: true,
                command: editor => {
                  console.log(editor.getCurrent());
                  this.savePage(editor.getCurrent());
                },
                className: "fa fa-save",
                attributes: { title: "Publish Work" }
              }
            ]
          }
        ]}
      />
    );
  }
}

export default PageBuilder;
