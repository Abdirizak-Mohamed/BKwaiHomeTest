import React, { Component } from "react";
import { Card, Grid, Header } from "semantic-ui-react";
import { url } from "../constants";
import ColumnGraph from "../components/columnGraph";
import ScatterGraph from "../components/scatterGraph";
import LineGraph from "../components/lineGraph";
import GraphForm from "./form";
import moment from "moment";

class GraphsDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphType: "column",
      sensor: "sensor_1",
      startDate: "",
      endDate: "",
      sensorTypes: ["tilt_x"],
      tilt_y: false,
      tilt_z: false,
      tilt_x: true,
      data: [],
      chartURL: `${url}/sensor/sensor_1/31-12-2019 00:00/07-01-2020 00:00/`,
      weatherURL: `${url}/weather/31-12-2019 00:00/07-01-2020 00:00/`,
      displayGraph: "column"
    };
  }
  componentDidMount() {}

  /*  getStats = async () => {
    const { sensor, sensorTypes } = this.state;
    let res = await fetch(`${url}/sensor/${sensor}/${sensorTypes}`);
    let response = await res.json();
    console.log(response);

    this.setState({ data: response });
  };*/

  handleDateChange = (event, data) => {
    this.setState({
      startDate: moment(data.value[0]).format("DD-MM-YYYY HH:SS"),
      endDate: moment(data.value[1]).format("DD-MM-YYYY HH:SS")
    });
  };

  handleSubmit = () => {
    const { sensor, startDate, endDate, graphType } = this.state;
    let axis = this.getAxis();

    let getUpdatedChartURL = `${sensor}/${startDate}/${endDate}/`;
    let getUpdateWeatherURL = `weather/${startDate}/${endDate}`;

    if (!startDate || !endDate) {
      getUpdatedChartURL = `${sensor}/31-12-2019 00:00/07-01-2020 00:00/`;
      getUpdateWeatherURL = `weather/31-12-2019 00:00/07-01-2020 00:00/`;
    } else {
      getUpdatedChartURL = `${sensor}/${startDate}/${endDate}/`;
      getUpdateWeatherURL = `weather/${startDate}/${endDate}`;
    }

    this.setState({
      chartURL: `${url}/sensor/${getUpdatedChartURL}`,
      weatherURL: `${url}/${getUpdateWeatherURL}`,
      sensorTypes: axis,
      displayGraph: graphType
    });
  };

  getAxis = () => {
    const { tilt_x, tilt_y, tilt_z } = this.state;
    let tiltAxis = [];
    if (tilt_x) {
      console.log("hi");
      tiltAxis.push("tilt_x");
    }
    if (tilt_y) {
      tiltAxis.push("tilt_y");
    }
    if (tilt_z) {
      tiltAxis.push("tilt_z");
    }
    return tiltAxis;
  };

  handleDropdownChange = (event, data) => {
    console.log("dr", data);
    this.setState({ [data.name]: data.value }, () => {
      console.log(this.state);
    });
  };

  handleCheckboxChange = (event, data) => {
    this.setState({ [data.name]: data.checked }, () => {
      console.log(this.state);
    });
  };

  render() {
    const {
      sensor,
      sensorTypes,
      startDate,
      endDate,
      tilt_x,
      tilt_y,
      tilt_z,
      graphType,
      chartURL,
      displayGraph,
      weatherURL
    } = this.state;
    const { chart, height } = this.props;

    let renderedGraph;
    if (displayGraph === "scatter") {
      renderedGraph = (
        <ScatterGraph
          sensor={sensor}
          sensorTypes={sensorTypes}
          startDate={startDate}
          endDate={endDate}
          chartURL={chartURL}
          weatherURL={weatherURL}
          chart={chart}
          height={height}
        />
      );
    } else if (displayGraph === "line") {
      renderedGraph = (
        <LineGraph
          sensor={sensor}
          sensorTypes={sensorTypes}
          startDate={startDate}
          endDate={endDate}
          chartURL={chartURL}
          weatherURL={weatherURL}
          chart={chart}
          height={height}
        />
      );
    } else {
      renderedGraph = (
        <ColumnGraph
          sensor={sensor}
          sensorTypes={sensorTypes}
          startDate={startDate}
          endDate={endDate}
          chartURL={chartURL}
          weatherURL={weatherURL}
          chart={chart}
          height={height}
        />
      );
    }

    let cardHeight = height + 30;

    return (
      <Card
        style={{
          width: "70vw",
          height: "83vh",
          backgroundColor: "#fff5d7",
          paddingTop: "0.6cm"
        }}
      >
        <Grid
          style={{
            width: "70vw",
            height: `${height}`,
            paddingTop: "1vh",
            paddingLeft: "2vw"
          }}
        >
          <Grid.Row>
            <Grid.Column>
              <Header as="h3">Weather and Sensor Data</Header>
              <GraphForm
                handleDateChange={this.handleDateChange}
                handleDropdownChange={(event, data) =>
                  this.handleDropdownChange(event, data)
                }
                handleCheckboxChange={this.handleCheckboxChange}
                tilt_y={tilt_y}
                tilt_z={tilt_z}
                tilt_x={tilt_x}
                sensor={sensor}
                graphType={graphType}
                handleSubmit={this.handleSubmit}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns="1" stretched>
            <Grid.Column>{renderedGraph}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Card>
    );
  }
}

export default GraphsDisplay;
