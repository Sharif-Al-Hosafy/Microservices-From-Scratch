const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  if (type === "postCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "commentCreated") {
    const { id, comment, postId, status } = data;
    posts[postId].comments.push({ id, comment, status });
  }

  res.status(201).send("ok");
});

app.listen(4002, () => {
  console.log("listining on 4002");
});
