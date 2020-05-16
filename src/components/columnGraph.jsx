import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { url } from "../constants";

class ColumnGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.createChart();
  }

  /*switchCharts(graphType){
      if (graphType === 'line'){
          return new am4charts.LineSeries()
      }else if (graphType === 'scatter'){

      }
  }*/

  createChart = async () => {
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    const { sensor, sensorTypes } = this.props;
    chart.dataSource.url = `${url}/sensor/${sensor}/${sensorTypes}`;

    let categoryAxis = chart.xAxes.push(new am4charts.DateAxis());
    categoryAxis.dataFields.category = "datetime";
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.dataFields.category = "tilt_y";
    valueAxis.title.text = "Tilt Displacement Degrees";

    //Initialise Series for each Axis
    const tiltAxis = ["tilt_y"];
    for (let tilt of tiltAxis) {
      createSeries(tilt);
    }

    function createSeries(tiltAxis) {
      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "datetime";
      series.dataFields.valueY = tiltAxis;
      series.name = tiltAxis;
      return series;
    }

    this.chart = chart;
  };

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
  }
}

export default ColumnGraph;
