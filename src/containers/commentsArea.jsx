import React, { Component } from "react";
import CommentForm from "../components/commentForm";
import moment from "moment";
import { url } from "../constants";
import { Card, Container, Header } from "semantic-ui-react";
import CommentList from "../components/commentList";
import Title from "../components/title";

class CommentsArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      comment: "",
      dateTime: "",
      allComments: []
    };
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async () => {
    let currentTime = moment().format("DD/MM/YYYY HH:MM:ss");

    let { state } = this;
    state.dateTime = currentTime;
    this.handleAddNewComment(state);
  };

  /*getCurrentTime(){
      return moment().format("DD/MM/YYYY HH:MM:ss")
  }*/

  handleAddNewComment = async state => {
    const res = await fetch(`${url}/comment/newComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(state)
    });
    let response = await res.json();
    state.allComments.push(response.newComment);
    this.setState({ allComments: state.allComments, name: "", comment: "" });
  };

  getAllComments = async state => {
    const res = await fetch(`${url}/comment/allComments`);
    let allComments = await res.json();
    this.setState({ allComments });
  };

  componentDidMount() {
    this.getAllComments();
  }

  render() {
    const { name, comment, allComments } = this.state;
    return (
      <Card
        fluid
        style={{ width: "25vw", padding: "0.3cm", backgroundColor: "#fff5d7" }}
      >
        <Title title={"Comments"} iconName="comments " />
        <Container
          style={{
            height: "25vh",
            overflow: "auto"
            //border: "1px solid black"
          }}
        >
          <CommentList comments={allComments} />
        </Container>

        <Header as="h4">Add new comment</Header>

        <CommentForm
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
          name={name}
          comment={comment}
        />
      </Card>
    );
  }
}

export default CommentsArea;
