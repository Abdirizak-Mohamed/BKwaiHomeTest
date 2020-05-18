import React, { Component } from "react";
import { Form } from "semantic-ui-react";

class CommentForm extends Component {
  state = {};
  render() {
    const { handleSubmit, handleInputChange, name, comment } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label="Name"
          name="name"
          placeholder="Name"
          onChange={handleInputChange}
          value={name}
        />
        <Form.TextArea
          label="Comment"
          placeholder="Write your comment here..."
          name="comment"
          onChange={handleInputChange}
          value={comment}
        />
        <Form.Button>Submit</Form.Button>
      </Form>
    );
  }
}

export default CommentForm;
