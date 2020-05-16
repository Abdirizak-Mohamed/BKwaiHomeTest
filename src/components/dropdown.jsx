import React, { Component } from "react";
import { Form, Select } from "semantic-ui-react";

class Dropdown extends Component {
  state = {};

  render() {
    const { options, label } = this.props;
    return (
      <Form.Field
        id={`Form-select-${label}`}
        options={options}
        label={label}
        control={Select}
      />
    );
  }
}

export default Dropdown;
