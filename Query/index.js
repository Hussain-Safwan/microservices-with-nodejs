const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

let posts = {};

const handleEvents = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    posts[data.postId].comments.push(data);
  }

  if (type === "CommentUpdated") {
    const index = posts[data.postId].comments.findIndex(
      (item) => item.id === data.id
    );
    posts[data.postId].comments[index] = data;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  handleEvents(type, data);
  res.send({});
});

app.listen(4002, async () => {
  console.log("query server running at 4002");
  const res = await axios.get("http://localhost:4005/events").catch((e) => {});
  res.data.forEach((item) => {
    handleEvents(item.type, item.data);
  });
});
