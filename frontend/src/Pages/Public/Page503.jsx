import React, { Component } from "react";
import { Button, Typography, Container } from "@material-ui/core";
import { RouteShape } from "Pages/_common/main/Routes";
import { FormattedMessage } from "react-intl";

export const PAGE_UNAVAILABLE = "/error/503";

export class Page503 extends Component {
  constructor(props) {
    super(props);
    this._tag = this.constructor.name;
  }

  render() {
    return (
      <Container className={this._tag}>
        {/* Image */}
        <FormattedMessage id="pages.Public.Pages.Page503.title">
          {title => <Typography>{title}</Typography>}
        </FormattedMessage>
        <FormattedMessage id="pages.Public.Pages.Page503.message">
          {message => <Typography>{message}</Typography>}
        </FormattedMessage>
        {/* Back Button */}
        <FormattedMessage id="pages.Public.Pages.Page503.back">
          {back => (
            <Button variant="primary" onClick={() => this.props.routeShape.history.goBack()}>
              {back}
            </Button>
          )}
        </FormattedMessage>
      </Container>
    );
  }

  RouteShape = RouteShape;
  static propTypes = { routeShape: this.RouteShape };
}
export default Page503;
