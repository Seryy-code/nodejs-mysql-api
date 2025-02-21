const express = require("express");
const app = express();
const taskRoute = require("./routes/task.routes");

app.use(express.json());
app.use("/api", taskRoute);

module.exports = app;
