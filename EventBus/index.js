const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const events = [];

app.get("/events", (req, res) => {
  res.send(events);
});

app.post("/event", (req, res) => {
  const event = req.body;
  console.log(event);
  events.push(event);
  axios.post("http://posts-cluster-ip-srv:4000/events", event).catch((e) => {});
  // axios.post("http://localhost:4001/events", event).catch((e) => {});
  // axios.post("http://localhost:4002/events", event).catch((e) => {});
  // axios.post("http://localhost:4003/events", event).catch((e) => {});

  res.status(200).send({ message: "OK" });
});

app.listen(4005, console.log("v2: event-bus server running at 4005"));
