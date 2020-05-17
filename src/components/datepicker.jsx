import React, { Component } from "react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

class DatePicker extends Component {
  state = {};
  render() {
    const { handleDateChange } = this.props;
    return (
      <SemanticDatepicker
        onChange={handleDateChange}
        type="range"
        label="Date Range"
        format={"DD-MM-YYYY"}
      />
    );
  }
}

export default DatePicker;
