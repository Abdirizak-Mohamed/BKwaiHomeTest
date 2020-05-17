import React, { Component } from "react";
import { Form, Select } from "semantic-ui-react";

class Dropdown extends Component {
  state = {};

  render() {
    const {
      options,
      label,
      handleDropdownChange,
      name,
      dropdownValue
    } = this.props;
    return (
      <Form.Field
        id={`Form-select-${label}`}
        options={options}
        label={label}
        name={name}
        control={Select}
        onChange={handleDropdownChange}
        value={dropdownValue}
      />
    );
  }
}

export default Dropdown;
