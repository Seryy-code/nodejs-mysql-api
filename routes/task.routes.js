const express = require("express");
const taskController = require("../controllers/task.controller");
const router = express.Router();

router.post("/task", taskController.save);
router.get("/task/:id", taskController.show);
router.get("/task", taskController.index);
router.patch("/task/:id", taskController.update);
router.delete("/task/:id", taskController.destroy);

module.exports = router;
