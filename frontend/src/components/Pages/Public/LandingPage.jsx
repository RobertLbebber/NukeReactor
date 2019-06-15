import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Alert, Button, Card, CardBody, CardTitle, CardSubtitle, Form } from "react-bootstrap";
import _ from "lodash";
import ECrown from "../../Util/Icons/ECrown";

import Restful from "../../../util/io/Restful";

export class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _tag: this.constructor.name,
      toggleRegister: true,
      formData: {},
      redirect: false,
      errorMessage: null
    };
    this._isMount = false;
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.addFormData = this.addFormData.bind(this);
    this.toggleRegister = this.toggleRegister.bind(this);
  }

  componentDidMount() {
    this._isMount = true;
  }

  componentWillUnmount() {
    this._isMount = false;
  }

  addFormData(name, data) {
    this.setState({
      form: { ...this.state.form, [name]: data },
      errorMessage: null
    });
  }

  onFormSubmit(e) {
    e.preventDefault();
    let url = "entrance/" + (this.state.toggleRegister ? "signup" : "login");
    Restful.post(url, this.state.form)
      .then(response => {
        if (this._isMount && response.status === 200) {
          this.props.updateUserDataFn(response);
        } else if (this._isMount && response.status === 400) {
          this.setState({ errorMessage: response.body.errorMessage });
        }
      })
      .catch(error => {});
  }

  toggleRegister = e => {
    e.preventDefault();
    this.setState({
      toggleRegister: !this.state.toggleRegister,
      formData: {},
      errorMessage: null
    });
  };

  getLogin() {
    return (
      <Card className="shadow">
        <Card.Title className="text-center" tag="h3">
          Login
        </Card.Title>
        <Card.Body>
          {!_.isNil(this.state.errorMessage) ? (
            <Alert variant="danger" onDismiss={this.handleDismiss}>
              {this.state.errorMessage}
            </Alert>
          ) : null}
          <Form onSubmit={this.onFormSubmit}>
            <Form.Group>
              <Form.Label htmlFor="Email" hidden>
                Email
              </Form.Label>
              <Form.Control
                type="email"
                name="emailAddress"
                id="Email"
                placeholder="Email"
                onChange={e => this.addFormData(e.target.name, e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="Password" hidden>
                Password
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                id="Password"
                onChange={e => this.addFormData(e.target.name, e.target.value)}
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group controlId="RememberMe">
              <Form.Check
                type="checkbox"
                label="Remember Me"
                onChange={e => this.addFormData(e.target.name, e.target.value)}
              />
            </Form.Group>
            <Button type="submit" color="success" className=" float-right ">
              Submit
            </Button>
          </Form>
          <Card.Subtitle>
            Already have an account?
            <a href="" className="hyperlink d-b " onClick={this.toggleRegister}>
              click here
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
          Register
        </Card.Title>
        <Card.Body>
          {!_.isNil(this.state.errorMessage) ? (
            <Alert variant="danger" onDismiss={this.handleDismiss}>
              {this.state.errorMessage}
            </Alert>
          ) : null}
          <Form onSubmit={this.onFormSubmit}>
            <Form.Group>
              <Form.Label htmlFor="fName">First Name</Form.Label>
              <Form.Control
                type="text"
                name="fName"
                id="fName"
                onChange={e => this.addFormData(e.target.name, e.target.value)}
                placeholder="First Name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="lName">Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lName"
                onChange={e => this.addFormData(e.target.name, e.target.value)}
                id="lName"
                placeholder="Last Name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="Email">Email</Form.Label>
              <Form.Control
                type="email"
                name="emailAddress"
                id="Email"
                placeholder="Email"
                onChange={e => this.addFormData(e.target.name, e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="Password">Password</Form.Label>
              <Form.Control
                type="password"
                onChange={e => this.addFormData(e.target.name, e.target.value)}
                name="password"
                id="Password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="Confirmation">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                onChange={e => this.addFormData(e.target.name, e.target.value)}
                name="confirmation"
                id="confirmation"
                placeholder="Confirmation"
              />
            </Form.Group>
            <Button type="submit" color="success" className=" float-right ">
              Submit
            </Button>
          </Form>
          <Card.Subtitle>
            Already have an account?
            <a href="" className="hyperlink d-b " onClick={this.toggleRegister}>
              click here
            </a>
          </Card.Subtitle>
        </Card.Body>
      </Card>
    );
  }

  render() {
    return (
      <div className={this.state._tag}>
        {this.state.toggleRegister ? this.getRegister() : this.getLogin()}
        <div className="crowns">
          <div className="shadow-e">
            <ECrown fontSize={80} fontUnit="vh" color="gray" />
          </div>
          <ECrown fontSize={80} fontUnit="vh" color="#333" />
        </div>
      </div>
    );
  }

  static propTypes = {
    updateUserDataFn: PropTypes.func.isRequired
  };

  // static defaultProps = {};
}
export default LandingPage;
