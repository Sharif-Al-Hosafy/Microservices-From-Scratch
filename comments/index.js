const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { comment } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, comment });

  commentsByPostId[req.params.id] = comments;

  await axios("http://localhost:4005", {
    type: "commentCreated",
    data: {
      commentId,
      comment,
      postId: req.params.id,
    },
  });

  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
