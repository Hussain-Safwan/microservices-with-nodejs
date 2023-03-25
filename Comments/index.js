const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

let commentsById = {};

app.get("/post/:id/comments", (req, res) => {
  res.send(commentsById[req.params.id] || []);
});

app.post("/post/:id/comment", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content, postId } = req.body;
  const comments = commentsById[req.params.id] || [];
  comments.push({ id: commentId, content, postId, status: "pending" });
  commentsById[req.params.id] = comments;

  axios
    .post("http://localhost:4005/event", {
      type: "CommentCreated",
      data: {
        id: commentId,
        content,
        postId: req.params.id,
        status: "pending",
      },
    })
    .catch((e) => {});

  res.status(200).send(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentModerated") {
    const { id, content, postId, status } = data;
    const comments = commentsById[postId];
    const comment = comments.find((item) => item.id === id);
    comment.status = status;
    await axios
      .post("http://localhost:4005/event", {
        type: "CommentUpdated",
        data: comment,
      })
      .catch((e) => {});
    console.log("update comment event");
  }

  res.send({});
});

app.listen(4001, console.log("comments server running at 4001"));
