const express = require("express");

const app = express();

// app.get("/", (req, res) => {
//   res.send("hello world!");
// });

// app.get("/task", (req, res) => {
//   res.send("tasks for cars");
// });

const postsRoute = require("./routes/tasks");
app.use("/tasks", postsRoute);

module.exports = app;
