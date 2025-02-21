const express = require("express");
const taskController = require("../controllers/task.controller");
const router = express.Router();

router.get("/task", taskController.save);

module.exports = router;
