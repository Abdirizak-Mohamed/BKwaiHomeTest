import React, { Component } from "react";

// src/App.js
class Clock extends Component {
  state = {
    time: new Date()
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      time: new Date()
    });
  }

  render() {
    return <h2>{this.state.time.toLocaleTimeString()}</h2>;
  }
}
export default Clock;
