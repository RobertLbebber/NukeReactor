import React, { Component } from "react";
import PropTypes from "prop-types";
import { AttachFile, InsertPhoto, Link, Videocam } from "@material-ui/icons/";
import _ from "lodash";
import { Button, ButtonToolbar, Form, Image } from "react-bootstrap";
// import FileUploader from "./FileUploader";
import avatar from "assets/img/avatar.png";
import * as Keys from "util/io/KeyCode.json";
import { findKey, pop } from "util/func/jsonUtil";
import ItemBar from "general/Containers/ItemHolder/ItemBar";
import Restful from "util/io/Restful";
import ModalWrap from "general/Containers/BootstrapWrappers/ModalWrap";

export class PostCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: this.props.context.activePostEvent,
      //_id: id
      showMoreText: false,
      form: {
        mainText: "",
        extraText: "",
        attachments: { image: [], file: [], video: [], link: [] },
      },
    };
    this._tag = this.constructor.name;
    this._isMount = false;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleHideModal = this.handleHideModal.bind(this);
    this.handleAttachments = this.handleAttachments.bind(this);
    this.handleDeleteItemCard = this.handleDeleteItemCard.bind(this);
  }

  componentDidMount() {
    this._isMount = true;
  }

  componentWillUnmount() {
    this._isMount = false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.showModal !== this.props.context.activePostEvent) {
      this.setState({ showModal: this.props.context.activePostEvent });
    }
  }

  handleHideModal() {
    this.props.context.postEvent.deactivate();
  }

  handleSubmit() {
    Restful.post("createPost", this.state.form).then(result => {
      if (this._isMount) {
        console.log(result);
      }
    });
  }

  onKeyPress = e => {
    switch (e.keyCode) {
      /** Enter */
      case Keys.backspace:
        this.handleSubmit();
        break;
      /** Escape */
      case Keys.escape:
        this.handleHideModal();
        break;
      default:
        break;
    }
  };

  handleDeleteItemCard(e, type, index) {
    let localForm = _.cloneDeep(this.state.form.attachments);
    let outdatedKey = findKey(localForm, type)[type];
    pop(outdatedKey, index);
    this.setState(
      {
        form: {
          ...this.state.form,
          attachments: {
            ...localForm,
          },
        },
      },
      () => {
        console.log(this.state);
      },
    );
  }

  handleAttachments(accepted, type) {
    let typeCopy = _.cloneDeep(this.state.form.attachments[type]);

    _.map(accepted.target.files, file => {
      typeCopy.push({
        location: URL.createObjectURL(file),
        name: file.name,
      });
    });
    this.setState({
      form: {
        ...this.state.form,
        attachments: {
          ...this.state.form.attachments,
          [type]: typeCopy,
        },
      },
    });
  }

  modalBody() {
    let uploaders = [
      {
        component: AttachFile,
        acceptable: ".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf",
        text: "File",
        type: "file",
      },
      {
        component: InsertPhoto,
        acceptable: "image/*",
        text: "Photo",
        type: "image",
      },
      { component: Link, acceptable: "https://*", text: "Link", type: "link" },
      {
        component: Videocam,
        acceptable: "video/*",
        text: "Video",
        type: "video",
      },
    ];
    let attachments = [
      { list: this.state.form.attachments.image, name: "image" },
      { list: this.state.form.attachments.file, name: "file" },
      { list: this.state.form.attachments.video, name: "video" },
      { list: this.state.form.attachments.link, name: "link" },
    ];
    return (
      <div className={this._tag + " " + this._tag + "-body"} onKeyPress={this.onKeyPress}>
        <Form>
          <Form.Group controlId="exampleForm.ControlTextarea1" className="post-form">
            <Image src={avatar} className="profile-icon-lg" roundedCircle />
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Have something to say?"
              onChange={e => {
                this.setState({ form: { ...this.state.form, mainText: e.currentTarget.value } });
              }}
            />
          </Form.Group>
          <hr />
          <ButtonToolbar className="post-buttons">
            {_.map(uploaders, (uploader, i) => (
              <Form.Group key={i} controlId={"post_buttons_" + i} className="post-button">
                <Form.Label>
                  <div className="btn btn-link">
                    <uploader.component />
                    {uploader.text}
                  </div>
                </Form.Label>
                <Form.Control
                  type="file"
                  accept={uploader.acceptable}
                  onChange={e => {
                    this.handleAttachments(e, uploader.type);
                  }}
                />
              </Form.Group>
            ))}
          </ButtonToolbar>
          {!_.isNil(this.state.form.attachments) ? (
            <ItemBar>
              {_.map(attachments, attachment =>
                _.map(attachment.list, (file, i) => (
                  <ItemBar.Card
                    key={attachment.name + "-" + i}
                    type={attachment.name}
                    data={{ ...file }}
                    closeFn={this.handleDeleteItemCard}
                  />
                )),
              )}
            </ItemBar>
          ) : null}
          <Button
            className="w-100"
            variant="link"
            onClick={() => {
              this.setState(prevState => {
                return { showMoreText: !prevState.showMoreText };
              });
            }}
          >
            Have More to Say?
          </Button>
          {this.state.showMoreText ? (
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="There's No limit here!"
              onChange={e => {
                this.setState({ form: { ...this.state.form, extraText: e.currentTarget.value } });
              }}
            />
          ) : null}
        </Form>
      </div>
    );
  }
  modalFooter() {
    return (
      <div className={this._tag + " " + this._tag + "-footer"}>
        <ButtonToolbar>
          <Button variant="light" onClick={this.handleHideModal}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleSubmit}>
            Submit
          </Button>
        </ButtonToolbar>
      </div>
    );
  }

  render() {
    return this.state.showModal ? (
      <ModalWrap
        head={"Create Post"}
        body={this.modalBody()}
        foot={this.modalFooter()}
        className={this._tag + " " + this._tag + "-modal"}
        onHide={this.handleHideModal}
        closeButton
      />
    ) : null;
  }

  static propTypes = {
    context: PropTypes.object,
  };

  static defaultProps = {};
}
export default PostCreator;
