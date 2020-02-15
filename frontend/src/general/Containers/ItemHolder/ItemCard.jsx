import React, { Component } from "react";
import PropTypes from "prop-types";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Cancel from "@material-ui/icons/Cancel";
import { Button } from "react-bootstrap";

export class ItemCard extends Component {
  constructor(props) {
    super(props);
    this._tag = this.constructor.name;
    this._mounted = false;
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  onKeyPress = e => {
    switch (e.keyCode) {
      /** Delete */
      case "46":
        this.props.closeFn();
        break;
      default:
        break;
    }
  };

  render() {
    let renderElement;
    let data = this.props.data;
    switch (this.props.type) {
      case "image":
        renderElement = <img className="attachment" src={data.location} alt={data.name} />;
        break;
      case "video":
        renderElement = (
          <video className="attachment" controls>
            <source src={data.location} type={data.type} />
            Your browser does not support the video tag.
          </video>
        );
        break;
      case "link":
        renderElement = <link className="attachment" href={data.location} />;
        break;
      case "file":
        renderElement = <div className="attachment">{data.location}</div>;
        break;
      default:
        renderElement = data;
    }
    return (
      <div className={this._tag} style={{ maxWidth: this.props.width, maxHeight: this.props.height }}>
        <Button
          variant="default"
          className={"close"}
          onClick={e => this.props.closeFn(e, this.props.type, this.props.accessKey)}
        >
          <Cancel />
        </Button>
        <Card className="card" style={{ maxWidth: this.props.width }} title={data.name}>
          <CardContent className="content" style={{ maxHeight: this.props.height }}>
            {renderElement}
            <a className="file-name">{data.name}</a>
          </CardContent>
        </Card>
      </div>
    );
  }

  static propTypes = {
    type: PropTypes.oneOf(["image", "video", "link", "file", "element"]),
    data: PropTypes.object.isRequired,
    accessKey: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    closeButton: PropTypes.bool,
    closeFn: PropTypes.func
  };

  static defaultProps = {
    closeButton: true,
    type: "image",
    width: 150,
    height: 120
  };
}
export default ItemCard;
