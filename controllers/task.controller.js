const Task = require("../models/task");

async function save(req, res) {
  try {
    const task = await Task.create({
      id: req.body.id,
      mark: req.body.mark,
      num: req.body.num,
      vin: req.body.vin,
      date: req.body.date,
      prepaid: req.body.prepaid,
      paidstate: req.body.paidstate,
    });
    res.status(201).json({
      message: "Task created successfully",
      task: task,
    });
  } catch (error) {
    console.error("Something went wrong: ", error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

module.exports = {
  save: save,
};
