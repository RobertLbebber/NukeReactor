import React, { Component } from "react";
import PropTypes from "prop-types";
import { Paper, Grid, withStyles } from "@material-ui/core";
import { Container } from "react-bootstrap";
import _ from "lodash";
// import QRCode from "qrcode.react";

import PostData from "assets/data/Post.json";
import AccountData from "assets/data/Account.json";
import { RouteShape } from "Routes/Routes";
import Post from "general/Inputs/Form/Post.jsx";

const styles = theme => {
  return {
    mainContent: { height: "100%", width: "100%" },
    post: { marginBottom: theme.spacing(1) },
  };
};

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _tag: this.constructor.name,
    };
    this._mounteded = false;
  }

  componentDidMount() {
    this._mounteded = true;
  }

  componentWillUnmount() {
    this._mounteded = false;
  }

  render() {
    let { classes } = this.props;

    return (
      <Container className={this.state._tag + " " + classes.mainContent}>
        <Grid container spacing={3} justify="space-between">
          <Grid item xs={1} sm={3} md={2}>
            {/* Sidebar */}
            <Paper>Sidebar</Paper>
          </Grid>
          <Grid item xs={10} sm={6} md={7} className={classes.mainContent}>
            {/* Main Content */}
            {/* <Paper className={classes.mainContent}>
              {this.state._tag}
              <QRCode value="http://localhost" />
            </Paper> */}
            <Grid container item spacing={1} direction="column" className={classes.mainContent}>
              {_.map(PostData, (post, index) => (
                <Post key={index} postData={post} poster={AccountData[index]} className={classes.post} />
              ))}
            </Grid>
          </Grid>
          <Grid item xs={1} sm={3} md={3}>
            {/* Banner */}
            <Paper>Banners</Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }

  static propTypes = {
    //Route Page Props
    routeShape: PropTypes.shape(RouteShape),
  };

  static defaultProps = {};
}
export default withStyles(styles)(Home);
