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
    this.chart = chart;
  };

  createSeries(tiltAxis, chart) {
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "datetime";
    series.dataFields.valueY = tiltAxis;
    series.strokeOpacity = 0;
    series.name = tiltAxis;
    var bullet = series.bullets.push(new am4charts.Bullet());
    var arrow = bullet.createChild(am4core.Circle);
    arrow.horizontalCenter = "middle";
    arrow.verticalCenter = "middle";
    arrow.fill = chart.colors.getIndex(1);
    arrow.direction = "top";
    arrow.width = 7;
    arrow.height = 7;
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

      let initialLength = this.chart.series.length;
      for (let i = 0; i < initialLength; i++) {
        this.chart.series.removeIndex(0).dispose();
      }
      for (let tilt of this.tiltAxis) {
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
