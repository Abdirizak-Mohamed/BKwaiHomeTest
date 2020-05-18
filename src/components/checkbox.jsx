import React, { Component } from "react";
import { Form } from "semantic-ui-react";

class CheckBoxes extends Component {
  state = {};
  render() {
    const { handleCheckboxChange, tilt_y, tilt_z, tilt_x } = this.props;
    return (
      <Form.Group inline>
        <label style={{ paddingLeft: "0.7vw" }}>Axis</label>
        <Form.Checkbox
          label="X-Axis"
          name={"tilt_x"}
          onChange={handleCheckboxChange}
          checked={tilt_x}
        />
        <Form.Checkbox
          label="Y-Axis"
          name={"tilt_y"}
          onChange={handleCheckboxChange}
          checked={tilt_y}
        />
        <Form.Checkbox
          label="Z-Axis"
          name={"tilt_z"}
          onChange={handleCheckboxChange}
          checked={tilt_z}
        />
      </Form.Group>
    );
  }
}

export default CheckBoxes;
