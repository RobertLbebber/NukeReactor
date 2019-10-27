import React, { Component } from "react";
// import PropTypes from "prop-types";
import PostData from "../../assets/data/Post.json"
import AccountData from "../../assets/data/Account.json"
import QRCode from "qrcode.react";
import { Paper, Grid, withStyles } from "@material-ui/core";
import { RouteShape } from "../../routes/Routes";
import { Container } from "react-bootstrap";
import Post from "../../general/Stateful/Post";

const styles = theme => {
  return {
    mainContent: { overflowX: "hidden", height: "100%", width: "100%" }
  };
};

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _tag: this.constructor.name
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
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
            <Paper className={classes.mainContent}>
              {this.state._tag}
              <QRCode value="http://localhost" />
            </Paper>
            {_.map(PostData,(post,index)=>(
<Post postData={post} poster={}/>
            )

            )}
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
    routeShape: RouteShape
  };

  static defaultProps = {};
}
export default withStyles(styles)(Home);
