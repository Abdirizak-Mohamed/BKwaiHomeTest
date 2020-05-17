import React, { Component } from "react";
import url from "../constants";

class AlertsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.getStats();
  }

  getStats = async () => {
    let res = await fetch(`${url}/sensor/alerts`);
    let response = await res.json();
    console.log(response);
  };
  render() {
    return <div>Hello</div>;
  }
}

export default AlertsContainer;
