const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.json());

app.post("/events", (req, res) => {});

app.listen(4003, () => {
  console.log("server is listining on 4003");
});
