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

  comments.push({ id: commentId, comment, status: "pending" });

  commentsByPostId[req.params.id] = comments;

  await axios
    .post("http://localhost:4005/events", {
      type: "commentCreated",
      data: {
        id: commentId,
        comment,
        postId: req.params.id,
        status: "pending",
      },
    })
    .catch((err) => {
      console.log(err.message);
    });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("Received Event: ", req.body.type);

  const { type, data } = req.body;
  if (type === "commentModerated") {
    const { id, postId, status, comment } = data;
    const comments = commentsByPostId[postId];

    const com = comments.find((como) => {
      return como.id === id;
    });
    com.status = status;
    console.log(comments);
    await axios.post("http://localhost:4005/events", {
      type: "commentUpdated",
      data: {
        id,
        postId,
        status,
        comment,
      },
    });
  }

  res.send("ok");
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
