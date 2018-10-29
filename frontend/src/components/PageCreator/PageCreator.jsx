import React, { Component } from "react";
import { Button } from "reactstrap";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import _ from "lodash";

// The editor core
import Editor, { Editable, createEmptyState } from "ory-editor-core";
import "ory-editor-core/lib/index.css"; // we also want to load the stylesheets

// The default ui components
import { Trash, DisplayModeToggle, Toolbar } from "ory-editor-ui";
import "ory-editor-ui/lib/index.css";

// The rich text area plugin
import slate from "ory-editor-plugins-slate";
import "ory-editor-plugins-slate/lib/index.css";

// The spacer plugin
import spacer from "ory-editor-plugins-spacer";
import "ory-editor-plugins-spacer/lib/index.css";

// The image plugin
import { imagePlugin } from "ory-editor-plugins-image";
import "ory-editor-plugins-image/lib/index.css";

// The video plugin
import video from "ory-editor-plugins-video";
import "ory-editor-plugins-video/lib/index.css";

// The background plugin
import background, {
  COLOR_MODE_FLAG,
  IMAGE_MODE_FLAG,
  GRADIENT_MODE_FLAG
} from "ory-editor-plugins-background";
import "ory-editor-plugins-background/lib/index.css";

// The html5-video plugin
import html5video from "ory-editor-plugins-html5-video";
import "ory-editor-plugins-html5-video/lib/index.css";

// The native handler plugin
import native from "ory-editor-plugins-default-native";

// The divider plugin
import divider from "ory-editor-plugins-divider";

// Renders json state to html, can be used on server and client side
import { HTMLRenderer } from "ory-editor-renderer";

export class PageCreator extends Component {
  constructor(props) {
    super(props);

    let plugins = {
      content: [
        slate(),
        spacer,
        imagePlugin({
          imageUpload: this.fakeImageUploadService("/images/react.png")
        }),
        video,
        divider,
        html5video
      ],
      layout: [
        background({
          defaultPlugin: slate(),
          imageUpload: this.fakeImageUploadService("/images/sea-bg.jpg"),
          enabledModes: COLOR_MODE_FLAG | IMAGE_MODE_FLAG | GRADIENT_MODE_FLAG
        })
      ],
      native
    };
    this.state = {
      _tag: this.constructor.name,
      _isMounted: false,
      sendSave: false,
      isDirty: false,
      edit: false,
      elements: [],
      editor: new Editor({
        plugins: plugins,
        // pass the content states
        editables: [
          ...this.props.userData,
          // creates an empty state, basically like the line above
          createEmptyState()
        ]
      }),
      plugins: plugins
    };
    this.sendUpdate = this.sendUpdate.bind(this);
    this.updateUserData = this.updateUserData.bind(this);
    this._isMounted = false;
  }

  componentDidMount() {
    this.state.editor.trigger.mode.preview();
    this._isMounted = true;
    const elements = document.querySelectorAll(".editable");
    let reactComponents = [];
    for (const element of elements) {
      reactComponents.push(
        <Editable
          key={element}
          editor={this.state.editor}
          id={element.dataset.id}
          onChange={state => {
            this.updateUserData(state);
          }}
        />
      );
    }
    this.setState({
      elements: reactComponents
    });
  }

  fakeImageUploadService = defaultUrl => (file, reportProgress) => {
    return new Promise((resolve, reject) => {
      let counter = 0;
      const interval = setInterval(() => {
        counter++;
        reportProgress(counter * 10);
        if (counter > 9) {
          clearInterval(interval);
          alert(
            "This is a fake image upload service, please provide actual implementation via plugin properties"
          );
          resolve({ url: defaultUrl });
        }
      }, 500);
    });
  };

  toggleEdit() {
    if (!this.state.edit) {
      this.state.editor.trigger.mode.edit();
    } else {
      this.state.editor.trigger.mode.preview();
    }
    this.setState({
      edit: !this.state.edit
    });
  }

  updateUserData(state) {
    if (!this.state.isDirty) {
      this.setState(
        {
          isDirty: true,
          state: [state]
        },
        () => {
          this.setState({
            isDirty: false
          });
        }
      );
    }
  }

  sendUpdate() {
    if (!this.state.isDirty) {
      console.log(this.state.state);
      this.props.saveChanges(this.state.state);
    }
  }

  getEditButtons() {
    let buttons = null;
    if (!this.state.edit) {
      buttons = (
        <Button
          color="primary"
          onClick={() => {
            this.toggleEdit();
          }}
        >
          Edit Page
        </Button>
      );
    } else {
      buttons = (
        <React.Fragment>
          <Button
            color="success"
            onClick={() => {
              this.sendUpdate();
            }}
            disabled={this.state.isDirty}
          >
            {this.state.isDirty ? "Loading..." : "Save Changes"}
          </Button>
          <Button
            color="danger"
            onClick={() => {
              this.toggleEdit();
            }}
          >
            Cancel
          </Button>
        </React.Fragment>
      );
    }
    return buttons;
  }

  render() {
    let editButtons = this.getEditButtons();
    let showFn = Component => (this.state.edit ? Component : null);
    return (
      <div>
        {editButtons}
        <div className="container">
          <div className="editable editable-area" data-id="1">
            {this.state.elements.map(element => element)}
            {showFn(<Trash editor={this.state.editor} />)}
            {showFn(<DisplayModeToggle editor={this.state.editor} />)}
          </div>
        </div>
        {showFn(<Toolbar editor={this.state.editor} />)}
      </div>
    );
  }

  static propTypes = {
    userData: PropTypes.array.isRequired,
    saveChanges: PropTypes.func.isRequired
  };

  static defaultProps = {};
}

export default PageCreator;
