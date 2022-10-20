const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "commentCreated") {
    const status = data.comment.includes("orange") ? "rejected" : "approved";

    await axios.post("http://localhost:4005/events", {
      type: "commentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        comment: data.comment,
        status,
      },
    });
  }

  res.status(201).send("ok");
});

app.listen(4003, () => {
  console.log("server is listining on 4003");
});
