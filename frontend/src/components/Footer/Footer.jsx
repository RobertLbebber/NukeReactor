import React, { Component } from "react";
import FooterBar from "../Sections/MaterialWrappers/FooterBar";
import { GlobalInputsConsumer } from "../Context/GlobalInputsContext";
import Button from "@material-ui/core/Button";
import _ from "lodash";
import { Save, Edit, Chat, Web } from "@material-ui/icons";

export class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _tag: this.constructor.name
    };
    this._isMount = false;
  }

  componentDidMount() {
    this._isMount = true;
  }

  componentWillUnmount() {
    this._isMount = false;
  }

  getSpecialRender(globalInputs) {
    switch (this.props.componentName) {
      case "Feed":
        return (
          <Button
            variant="contained"
            className={"special-btn " + (globalInputs.activePostEvent ? "active" : "")}
            onClick={() => {
              if (globalInputs.activePostEvent) {
                globalInputs.postEvent.deactivate();
              } else {
                globalInputs.postEvent.activate();
              }
            }}
          >
            <Chat />
          </Button>
        );
      case "Account":
        return (
          <React.Fragment>
            {!globalInputs.activeAccountEditor ? (
              <Button
                variant="contained"
                className={"special-btn "}
                onClick={() => {
                  if (globalInputs.activeAccountEditor) {
                    globalInputs.accountEditor.deactivate();
                  } else {
                    globalInputs.accountEditor.activate();
                  }
                }}
              >
                <Web />
              </Button>
            ) : (
              <div>
                <Button
                  variant="contained"
                  className={"special-btn active"}
                  onClick={() => {
                    if (globalInputs.activeAccountEditor) {
                      globalInputs.accountEditor.deactivate();
                    } else {
                      globalInputs.accountEditor.activate();
                    }
                  }}
                >
                  <Web />
                </Button>
                <Button
                  variant="contained"
                  className={"special-btn "}
                  onClick={() => {
                    if (!_.isNil(globalInputs.accountEditor.save)) {
                      globalInputs.accountEditor.save();
                    }
                  }}
                >
                  <Save />
                </Button>
              </div>
            )}
          </React.Fragment>
        );
    }
  }

  render() {
    return (
      <div className={this.state._tag}>
        <GlobalInputsConsumer>
          {globalInputs => <FooterBar specialRender={this.getSpecialRender(globalInputs)} />}
        </GlobalInputsConsumer>
      </div>
    );
  }
}
export default Footer;
