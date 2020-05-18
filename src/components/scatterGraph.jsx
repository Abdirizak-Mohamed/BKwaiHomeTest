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
    let chart = am4core.create(this.props.chart, am4charts.XYChart);
    const { sensorTypes } = this.props;
    chart.dateFormatter.inputDateFormat = "dd/MM/yyyy HH:mm";
    chart.colors.step = 2;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.dataFields.category = "datetime";
    dateAxis.title.text = "Reading Date";

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.dataFields.category = "tilt_y";
    valueAxis.title.text = "Tilt Displacement (°)";

    let weatherValueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    weatherValueAxis.renderer.opposite = true;
    weatherValueAxis.title.text = "Temperature (°C)";

    //Initialise Series for each Axis
    const tiltAxis = sensorTypes;
    for (let tilt of tiltAxis) {
      this.createSeries(tilt, chart);
    }
    this.createWeatherSeries(chart);
    chart.legend = new am4charts.Legend();
    this.chart = chart;
  };

  createWeatherSeries(chart) {
    let weatherSeries = chart.series.push(new am4charts.LineSeries());
    weatherSeries.dataSource.url = this.props.weatherURL;
    weatherSeries.yAxis = chart.yAxes.getIndex(1);
    weatherSeries.dataFields.dateX = "time";
    weatherSeries.dataFields.valueY = "temperature";
    weatherSeries.name = "Temperature";
  }

  createSeries(tiltAxis, chart) {
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataSource.url = this.props.chartURL;
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

  updateSeries(sensorTypes, chart) {
    let initialLength = chart.series.length;
    for (let i = 0; i < initialLength; i++) {
      chart.series.removeIndex(0).dispose();
    }

    for (let tilt of sensorTypes) {
      this.createSeries(tilt, chart);
    }
    this.createWeatherSeries(chart);
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
  componentDidUpdate(oldProps) {
    if (
      oldProps.chartURL !== this.props.chartURL ||
      oldProps.sensorTypes !== this.props.sensorTypes
    ) {
      const { sensorTypes } = this.props;
      this.updateSeries(sensorTypes, this.chart);
    }
  }

  render() {
    const { chart, height } = this.props;
    return (
      <div id={chart} style={{ width: "100%", height: `${height}` }}></div>
    );
  }
}

export default ColumnGraph;
