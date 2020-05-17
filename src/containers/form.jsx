import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import Dropdown from "../components/dropdown";
import { graphTypes, sensors } from "../constants";
import DatePicker from "../components/datepicker";
import CheckBoxes from "../components/checkbox";

class GraphForm extends Component {
  state = {};
  render() {
    const {
      handleDateChange,
      handleDropdownChange,
      handleCheckboxChange,
      tilt_y,
      tilt_z,
      tilt_x,
      graphType,
      sensor,
      handleSubmit
    } = this.props;
    return (
      <Form fluid onSubmit={handleSubmit}>
        <Form.Group>
          <Dropdown
            options={graphTypes}
            label={"Graph Type"}
            handleDropdownChange={handleDropdownChange}
            name={"graphType"}
            dropdownValue={graphType}
          />
          <Dropdown
            options={sensors}
            label={"Sensor Number"}
            handleDropdownChange={handleDropdownChange}
            name={"sensor"}
            dropdownValue={sensor}
          />
          <DatePicker handleDateChange={handleDateChange} />
        </Form.Group>
        <Form.Group>
          <CheckBoxes
            handleCheckboxChange={handleCheckboxChange}
            tilt_y={tilt_y}
            tilt_z={tilt_z}
            tilt_x={tilt_x}
          />
          <Form.Button type="submit">Submit</Form.Button>
        </Form.Group>
      </Form>
    );
  }
}

export default GraphForm;
