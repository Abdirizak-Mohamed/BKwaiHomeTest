import React, { Component } from "react";
import { Form, Grid } from "semantic-ui-react";
import Dropdown from "../components/dropdown";
import { graphTypes, sensors } from "../constants";
import DatePicker from "../components/datepicker";
import CheckBoxes from "../components/checkbox";

class GraphForm extends Component {
  state = {};
  render() {
    return (
      <Form fluid>
        <Form.Group>
          <Dropdown options={graphTypes} label={"Graph Type"} />
          <Dropdown options={sensors} label={"Sensor Number"} />
          <DatePicker />
        </Form.Group>
        <Form.Group>
          <CheckBoxes />
        </Form.Group>
      </Form>
    );
  }
}

export default GraphForm;
