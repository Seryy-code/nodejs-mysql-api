const express = require("express");
const app = express();
const taskRoute = require("./routes/task.routes");
const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173"],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/api", taskRoute);

module.exports = app;
