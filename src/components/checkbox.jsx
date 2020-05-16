import React, { Component } from "react";
import { Form, Label } from "semantic-ui-react";

class CheckBoxes extends Component {
  state = {};
  render() {
    return (
      <Form.Group inline>
        <label>Axis</label>
        <Form.Checkbox label="X-Axis" />
        <Form.Checkbox label="Y-Axis" />
        <Form.Checkbox label="Z-Axis" />
      </Form.Group>
    );
  }
}

export default CheckBoxes;
