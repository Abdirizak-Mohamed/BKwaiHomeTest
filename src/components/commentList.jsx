import React, { Component } from "react";
import { List } from "semantic-ui-react";

class CommentList extends Component {
  state = {};
  render() {
    const { comments } = this.props;

    let commentList;
    if (comments) {
      commentList = comments.map(individualComment => {
        const { name, comment, dateTime } = individualComment;

        return (
          <List.Item>
            <List.Content>
              <List.Header>{name}</List.Header>
              <List.Description>{comment}</List.Description>
              <List.Description>{dateTime}</List.Description>
            </List.Content>
          </List.Item>
        );
      });
    }

    return (
      <List divided relaxed>
        {commentList}
      </List>
    );
  }
}

export default CommentList;
