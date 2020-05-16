import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import GraphsDisplay from "./graphsDisplay";

class Dashboard extends Component {
  state = {};
  componentDidMount() {
    console.log("Hi1");
  }
  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <GraphsDisplay />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Dashboard;
