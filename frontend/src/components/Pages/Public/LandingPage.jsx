import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  // CardText,
  CardSubtitle,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Row
} from "reactstrap";
import ECrown from "../../Util/Icons/ECrown";
import "./LandingPage.css";
import "../../../assets/css/generic.css";
import restful from "../../../util/io/restful";

export class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _tag: this.constructor.name,
      toggleRegister: true,
      formData: {},
      redirect: false
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
    this.setState({ form: { ...this.state.form, [name]: data } });
  }

  onFormSubmit(e) {
    e.preventDefault();
    let url = "entrance/" + (this.state.toggleRegister ? "signup" : "login");
    restful
      .post(url, this.state.form)
      .then(response => {
        //TODO Redirect
        this.props.updateUserDataFn(response);
      })
      .catch(error => {
        //TODO
        console.log(error);
      });
  }

  toggleRegister = e => {
    e.preventDefault();
    this.setState({ toggleRegister: !this.state.toggleRegister, formData: {} });
  };

  getLogin() {
    return (
      <Card className="shadow">
        <CardTitle className="text-center" tag="h3">
          Login
        </CardTitle>
        <CardBody>
          <Form onSubmit={this.onFormSubmit}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="Email" hidden>
                    Email
                  </Label>
                  <Input
                    type="email"
                    name="emailAddress"
                    id="Email"
                    placeholder="Email"
                    onChange={e =>
                      this.addFormData(e.target.name, e.target.value)
                    }
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="Password" hidden>
                    Password
                  </Label>
                  <Input
                    type="password"
                    name="password"
                    id="Password"
                    onChange={e =>
                      this.addFormData(e.target.name, e.target.value)
                    }
                    placeholder="Password"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Label check>
              Remember Me
              <Input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                style={{ marginTop: 3, marginLeft: 10 }}
                onChange={e => this.addFormData(e.target.name, e.target.value)}
              />
            </Label>
            <Button type="submit" color="success" className=" float-right ">
              Submit
            </Button>
          </Form>
          <CardSubtitle>
            Already have an account?
            <a href="" className="hyperlink" onClick={this.toggleRegister}>
              click here
            </a>
          </CardSubtitle>
        </CardBody>
      </Card>
    );
  }

  getRegister() {
    return (
      <Card
        className={
          "shadow" + (this.state.toggleRegister ? " adjustHeight" : "")
        }
      >
        <CardTitle className="text-center" tag="h3">
          Register
        </CardTitle>
        <CardBody>
          <Form onSubmit={this.onFormSubmit}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="fName">First Name</Label>
                  <Input
                    type="text"
                    name="fName"
                    id="fName"
                    onChange={e =>
                      this.addFormData(e.target.name, e.target.value)
                    }
                    placeholder="First Name"
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="lName">Last Name</Label>
                  <Input
                    type="text"
                    name="lName"
                    onChange={e =>
                      this.addFormData(e.target.name, e.target.value)
                    }
                    id="lName"
                    placeholder="Last Name"
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="Email">Email</Label>
              <Input
                type="email"
                name="emailAddress"
                id="Email"
                placeholder="Email"
                onChange={e => this.addFormData(e.target.name, e.target.value)}
              />
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="Password">Password</Label>
                  <Input
                    type="password"
                    onChange={e =>
                      this.addFormData(e.target.name, e.target.value)
                    }
                    name="password"
                    id="Password"
                    placeholder="Password"
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="Confirmation">Confirm Password</Label>
                  <Input
                    type="password"
                    onChange={e =>
                      this.addFormData(e.target.name, e.target.value)
                    }
                    name="confirmation"
                    id="confirmation"
                    placeholder="Confirmation"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button type="submit" color="success" className=" float-right ">
              Submit
            </Button>
          </Form>
          <CardSubtitle>
            Already have an account?
            <a href="" className="hyperlink" onClick={this.toggleRegister}>
              click here
            </a>
          </CardSubtitle>
        </CardBody>
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
