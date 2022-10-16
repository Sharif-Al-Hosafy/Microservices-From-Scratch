const express = require("express");
const app = express();
const { randomBytes } = require("crypto");
const cors = require("cors");

app.use(express.json());
app.use(cors());
const posts = {};

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const title = req.body.title;
  posts[id] = { id, title };
  res.status(201).json(posts[id]);
});

app.listen(4000, () => {
  console.log("server listining");
});
