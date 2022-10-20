const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.json());

app.post("/events", (req, res) => {
  const event = req.body;

  // posts service
  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err.message);
  });

  // comments service
  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err.message);
  });

  // query service
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err.message);
  });

  // moderation service
  axios.post("http://localhost:4003/events", event).catch((err) => {
    console.log(err.message);
  });

  res.status(200).send("Success");
});

app.listen(4005, () => {
  console.log("listining on 4005");
});
