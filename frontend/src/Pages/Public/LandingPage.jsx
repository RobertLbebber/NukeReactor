import React, { Component } from "react";
import PropTypes from "prop-types";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { Grid } from "@material-ui/core";
import _ from "lodash";

import ECrown from "general/Feedback/Graphics/Icons/ECrown";
import Restful from "util/io/Restful";

export class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _tag: this.constructor.name,
      toggleRegister: true,
      formData: {},
      redirect: false,
      errorMessage: null,
    };
    this._mounted = false;
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.addFormData = this.addFormData.bind(this);
    this.toggleRegister = this.toggleRegister.bind(this);
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  addFormData(name, data) {
    this.setState({
      form: { ...this.state.form, [name]: data },
      errorMessage: null,
    });
  }

  onFormSubmit(e) {
    e.preventDefault();
    let url = "entrance/" + (this.state.toggleRegister ? "signup" : "login");
    Restful.post(url, this.state.form).then(response => {
      if (this._mounted && response.status === 200) {
        this.props.updateUserDataFn(response);
      } else if (this._mounted && response.status === 400) {
        this.setState({ errorMessage: response.body.errorMessage });
      }
    });
  }

  toggleRegister = e => {
    e.preventDefault();
    this.setState({
      toggleRegister: !this.state.toggleRegister,
      formData: {},
      errorMessage: null,
    });
  };

  getLogin() {
    return (
      <Card className="shadow">
        <Card.Title className="text-center" tag="h3">
          <FormattedMessage id="pages.Public.Pages.LandingPage.Login" />
        </Card.Title>
        <Card.Body>
          {!_.isNil(this.state.errorMessage) ? (
            <Alert variant="danger" onDismiss={this.handleDismiss}>
              {this.state.errorMessage}
            </Alert>
          ) : null}
          <Form onSubmit={this.onFormSubmit}>
            <Form.Group>
              <FormattedMessage id="pages.Public.Pages.LandingPage.form.Email.label">
                {label => <Form.Label htmlFor="Email">{label}</Form.Label>}
              </FormattedMessage>
              <FormattedMessage id="pages.Public.Pages.LandingPage.form.Email.placeholder">
                {placeholder => (
                  <Form.Control
                    type="email"
                    name="emailAddress"
                    id="Email"
                    placeholder={placeholder}
                    onChange={e => this.addFormData(e.target.name, e.target.value)}
                  />
                )}
              </FormattedMessage>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="Password">
                <FormattedMessage id="pages.Public.Pages.LandingPage.form.Password.label" />
              </Form.Label>
              <FormattedMessage id="pages.Public.Pages.LandingPage.form.Password.placeholder">
                {placeholder => (
                  <Form.Control
                    type="password"
                    onChange={e => this.addFormData(e.target.name, e.target.value)}
                    name="password"
                    id="Password"
                    placeholder={placeholder}
                  />
                )}
              </FormattedMessage>
            </Form.Group>
            <Form.Group controlId="RememberMe">
              <FormattedMessage id="pages.Public.Pages.LandingPage.form.RememberMe.label">
                {label => (
                  <Form.Check
                    name="rememberMe"
                    type="checkbox"
                    label={label}
                    onChange={e => this.addFormData(e.target.name, e.target.value)}
                  />
                )}
              </FormattedMessage>
            </Form.Group>
            <Button type="submit" color="success" className=" float-right ">
              <FormattedMessage id="common.Buttons.Submit" />
            </Button>
          </Form>
          <Card.Subtitle>
            <FormattedMessage id="pages.Public.Pages.LandingPage.SignUp.Switch" />
            <a href="" className="hyperlink d-b " onClick={this.toggleRegister}>
              <FormattedMessage id="common.Directions.ClickHere" />
            </a>
          </Card.Subtitle>
        </Card.Body>
      </Card>
    );
  }

  getRegister() {
    return (
      <Card className={"shadow" + (this.state.toggleRegister ? " adjustHeight" : "")}>
        <Card.Title className="text-center" tag="h3">
          <FormattedMessage id="pages.Public.Pages.LandingPage.Register" />
        </Card.Title>
        <Card.Body>
          {!_.isNil(this.state.errorMessage) ? (
            <Alert variant="danger" onDismiss={this.handleDismiss}>
              {this.state.errorMessage}
            </Alert>
          ) : null}
          <Form onSubmit={this.onFormSubmit}>
            <FormattedMessage id="pages.Public.Pages.LandingPage.form.FirstName">
              {firstName => (
                <Form.Group>
                  <Form.Label htmlFor="fName">{firstName.label}</Form.Label>
                  <Form.Control
                    type="text"
                    name="fName"
                    id="fName"
                    onChange={e => this.addFormData(e.target.name, e.target.value)}
                    placeholder={firstName.placeholder}
                  />
                </Form.Group>
              )}
            </FormattedMessage>
            <FormattedMessage id="pages.Public.Pages.LandingPage.form.LastName">
              {lastName => (
                <Form.Group>
                  <Form.Label htmlFor="lName">{lastName.label}</Form.Label>
                  <Form.Control
                    type="text"
                    name="lName"
                    onChange={e => this.addFormData(e.target.name, e.target.value)}
                    id="lName"
                    placeholder={lastName.placeholder}
                  />
                </Form.Group>
              )}
            </FormattedMessage>
            <FormattedMessage id="pages.Public.Pages.LandingPage.form.Email">
              {email => (
                <Form.Group>
                  <Form.Label htmlFor="Email">{email.label}</Form.Label>
                  <Form.Control
                    type="email"
                    name="emailAddress"
                    id="Email"
                    placeholder={email.placeholder}
                    onChange={e => this.addFormData(e.target.name, e.target.value)}
                  />
                </Form.Group>
              )}
            </FormattedMessage>
            <FormattedMessage id="pages.Public.Pages.LandingPage.form.Password">
              {password => (
                <Form.Group>
                  <Form.Label htmlFor="Password">{password.label}</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={e => this.addFormData(e.target.name, e.target.value)}
                    name="password"
                    id="Password"
                    placeholder={password.placeholder}
                  />
                </Form.Group>
              )}
            </FormattedMessage>
            <FormattedMessage id="pages.Public.Pages.LandingPage.form.Confirmation">
              {confirmation => (
                <Form.Group>
                  <Form.Label htmlFor="Confirmation">{confirmation.label}</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={e => this.addFormData(e.target.name, e.target.value)}
                    name="confirmation"
                    id="confirmation"
                    placeholder={confirmation.placeholder}
                  />
                </Form.Group>
              )}
            </FormattedMessage>
            <Button type="submit" color="success" className=" float-right ">
              <FormattedMessage id="common.Buttons.Submit" />
            </Button>
          </Form>
          <Card.Subtitle>
            <FormattedMessage id="pages.Public.Pages.LandingPage.SignIn.Switch" />
            <a href="" className="hyperlink d-b " onClick={this.toggleRegister}>
              <FormattedMessage id="common.Directions.ClickHere" />
            </a>
          </Card.Subtitle>
        </Card.Body>
      </Card>
    );
  }

  render() {
    return (
      <div className={this.state._tag}>
        <Grid spacing={3} container>
          <Grid xs={3} item>
            {this.state.toggleRegister ? this.getRegister() : this.getLogin()}
          </Grid>
          <Grid xs={9} item>
            <div className="crowns">
              <div className="shadow-e">
                <ECrown fontSize={80} fontUnit="vh" color="gray" />
              </div>
              <ECrown fontSize={80} fontUnit="vh" color="#333" />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }

  static propTypes = {
    updateUserDataFn: PropTypes.func.isRequired,
  };

  // static defaultProps = {};
}
export default LandingPage;
