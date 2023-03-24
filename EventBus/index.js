const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/event", (req, res) => {
  const event = req.body;
  console.log(event);
  axios.post("http://localhost:4000/events", event).catch((e) => {});
  axios.post("http://localhost:4001/events", event).catch((e) => {});
  axios.post("http://localhost:4002/events", event).catch((e) => {});

  res.status(200).send({ message: "OK" });
});

app.listen(4005, console.log("event-bus server running at 4005"));
