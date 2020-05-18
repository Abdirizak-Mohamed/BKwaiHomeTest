const express = require("express");
const router = express.Router();
const Comment = require("../models/comments");

router.get("/allComments", (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      res.status(500).send({ error: "Error connecting to DB" });
    } else {
      res.status(200).send(comments);
    }
  });
});

router.post("/newComment", (req, res) => {
  console.log(req.body);
  const { name, comment, dateTime } = req.body;

  let addNewComment = new Comment({
    name: name,
    comment: comment,
    dateTime: dateTime
  });

  addNewComment.save((err, newComment) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.status(201).send({
        newComment
      });
    }
  });
});

module.exports = router;
