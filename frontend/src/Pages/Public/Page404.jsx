import React, { Component } from "react";
import { Button, Typography, Container } from "@material-ui/core";
import { RouteShape } from "Routes/Routes";
import { FormattedMessage } from "react-intl";
//import func from '/frontend/src/util/func/func'

export const PAGE_NOT_FOUND = "/error/404";

export class Page404 extends Component {
  constructor(props) {
    super(props);
    //var id=func.generateSerial(9,36);
    this.state = {
      _tag: this.constructor.name,
      //_id: id
    };
    this._isMount = false;
  }

  componentDidMount() {
    this._isMount = true;
  }

  componentWillUnmount() {
    this._isMount = false;
  }

  render() {
    return (
      <Container className={this.state._tag}>
        {/* Image */}
        <FormattedMessage id="pages.Public.Pages.Page404.title">
          {title => <Typography>{title}</Typography>}
        </FormattedMessage>
        <FormattedMessage id="pages.Public.Pages.Page404.message">
          {message => <Typography>{message}</Typography>}
        </FormattedMessage>
        {/* Back Button */}
        <FormattedMessage id="pages.Public.Pages.Page404.back">
          {back => (
            <Button variant="primary" onClick={() => this.props.routeShape.history.goBack()}>
              {back}
            </Button>
          )}
        </FormattedMessage>
      </Container>
    );
  }

  static propTypes = { routeShape: RouteShape };

  // static defaultProps = {};
}
export default Page404;
