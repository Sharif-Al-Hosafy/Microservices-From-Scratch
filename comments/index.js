const express = require("express");
const app = express();
const { randomBytes } = require("crypto");
const cors = require("cors");

app.use(express.json());
app.use(cors());
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.status(200).json(commentsByPostId[req.params.id]);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const comments = commentsByPostId[req.params.id] || [];
  const { content } = req.body;
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;
  res.status(201).json(commentsByPostId[req.params.id]);
});

app.listen(4001, () => {
  console.log("server listining");
});
