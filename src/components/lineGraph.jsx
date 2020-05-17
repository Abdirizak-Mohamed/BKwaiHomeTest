import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

class ColumnGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartURL: this.props.chartURL
    };
  }
  componentDidMount() {
    this.createChart();
  }

  createChart = async () => {
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    const { sensorTypes } = this.props;
    chart.dateFormatter.inputDateFormat = "dd/MM/yyyy HH:mm";
    chart.dataSource.url = this.props.chartURL;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.dataFields.category = "datetime";

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.dataFields.category = "tilt_y";
    valueAxis.title.text = "Tilt Displacement Degrees";

    //Initialise Series for each Axis
    const tiltAxis = sensorTypes;
    for (let tilt of tiltAxis) {
      this.createSeries(tilt, chart);
    }
    console.log(chart.series);
    this.chart = chart;
  };

  createSeries(tiltAxis, chart) {
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "datetime";
    series.dataFields.valueY = tiltAxis;
    series.name = tiltAxis;
    return series;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
  componentDidUpdate(oldProps) {
    if (oldProps.chartURL !== this.props.chartURL) {
      this.chart.dataSource.url = this.props.chartURL;
      this.chart.dataSource.load();
    }

    if (oldProps.sensorTypes !== this.props.sensorTypes) {
      this.tiltAxis = this.props.sensorTypes;
      console.log("series", this.chart.series);
      let initialLength = this.chart.series.length;
      for (let i = 0; i < initialLength; i++) {
        this.chart.series.removeIndex(0).dispose();
      }
      console.log("length2", this.chart.series.length);
      for (let tilt of this.tiltAxis) {
        console.log("tilt:", tilt);
        this.createSeries(tilt, this.chart);
      }
    }
  }

  render() {
    console.log(this.props);

    return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
  }
}

export default ColumnGraph;
