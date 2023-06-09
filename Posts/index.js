const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

let posts = [];

app.get("/posts", (req, res) => {
  console.log("got");
  res.send(posts);
});

app.post("/post", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  posts.push({
    id: id,
    title: req.body.title,
  });

  const post = posts[posts.length - 1];

  await axios
    .post("http://event-bus-srv:4005/event", {
      type: "PostCreated",
      data: post,
    })
    .catch((e) => {});
  console.log("Event broadcast");
  res.send(post);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log("V2: posts server running at 4000");
});
