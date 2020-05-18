import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import GraphsDisplay from "./graphsDisplay";
import AlertsContainer from "./alertsDisplay";
import CommentsArea from "./commentsArea";
import NavBar from "./Navbar";

class Dashboard extends Component {
  state = {};
  componentDidMount() {}
  render() {
    return (
      <div>
        <NavBar />
        <Grid style={{ paddingLeft: "1vw", paddingRight: "2vw" }}>
          <Grid.Row colums={2} style={{ paddingRight: "2vw" }}>
            <Grid.Column width={12}>
              <GraphsDisplay chart="chartOne" height={"50vh"} />
            </Grid.Column>
            <Grid.Column width={4}>
              <CommentsArea />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row colums={2} style={{ paddingRight: "2vw" }}>
            <Grid.Column width={12}>
              <GraphsDisplay chart="chartTwo" height={"50vh"} />
            </Grid.Column>
            <Grid.Column width={4}>
              <AlertsContainer />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
