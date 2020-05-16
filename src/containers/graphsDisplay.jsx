import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import { url } from "../constants";
import ColumnGraph from "../components/columnGraph";
import GraphForm from "./form";

class GraphsDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sensor: "sensor_2",
      startDate: "",
      endDate: "",
      sensorTypes: "tilt_z tilt_y",
      data: []
    };
  }
  componentDidMount() {
    console.log("hi");
    this.getStats();
  }

  getStats = async () => {
    const { sensor, sensorTypes } = this.state;
    let res = await fetch(`${url}/sensor/${sensor}/${sensorTypes}`);
    let response = await res.json();
    console.log(response);

    this.setState({ data: response });
  };

  render() {
    const { sensor, sensorTypes } = this.state;
    return (
      <Card style={{ width: "34cm", height: "8cm" }}>
        <GraphForm />
        <ColumnGraph sensor={sensor} sensorTypes={sensorTypes} />
      </Card>
    );
  }
}

export default GraphsDisplay;
