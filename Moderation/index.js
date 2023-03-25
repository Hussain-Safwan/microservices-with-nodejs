const express = require("express");
const bodyParser = require("body-parser");
const { default: axios } = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    await axios
      .post("http://localhost:4005/event", {
        type: "CommentModerated",
        data: {
          ...data,
          status: status,
        },
      })
      .catch((e) => {});
  }

  res.send({});
});

app.listen(4003, console.log("moderation server running at 4003"));
