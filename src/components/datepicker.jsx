import React, { Component } from "react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

class DatePicker extends Component {
  state = {};
  render() {
    const onChange = (event, data) => console.log(data.value);
    return (
      <SemanticDatepicker onChange={onChange} type="range" label="Date Range" />
    );
  }
}

export default DatePicker;
