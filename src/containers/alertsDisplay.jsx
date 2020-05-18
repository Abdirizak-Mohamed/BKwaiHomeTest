import React, { Component } from "react";
import { url } from "../constants";
import { Card, Container } from "semantic-ui-react";
import AlertList from "../components/alertList";
import Title from "../components/title";

class AlertsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.getStats();
  }

  getStats = async () => {
    let sensorOneRes = await fetch(`${url}/sensor/alerts/sensor_1`);
    let sensorTwoRes = await fetch(`${url}/sensor/alerts/sensor_2`);
    let sensorOneResponse = await sensorOneRes.json();
    let sensorTwoResponse = await sensorTwoRes.json();
    this.setState({ alerts: sensorOneResponse.concat(sensorTwoResponse) });
  };

  render() {
    const { alerts } = this.state;
    return (
      <Card
        fluid
        style={{
          width: "25vw",
          height: "45vh",
          padding: "0.3cm",
          backgroundColor: "#fff5d7"
        }}
      >
        <Title title={"Alerts"} iconName="exclamation triangle" />
        <Container
          style={{
            height: "25vh",
            overflow: "auto"
          }}
        >
          <AlertList alerts={alerts} />
        </Container>
      </Card>
    );
  }
}

export default AlertsContainer;
