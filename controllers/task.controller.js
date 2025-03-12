const { Task, NoteTask, PartTask, WorkTask } = require("../models");

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

    const noteTasks = Array.isArray(req.body.noteTasks)
      ? req.body.noteTasks.map((note) => ({
          task_id: task.id,
          description: note.description,
        }))
      : [];

    if (noteTasks.length) await NoteTask.bulkCreate(noteTasks);

    const partTasks = Array.isArray(req.body.partTasks)
      ? req.body.partTasks.map((part) => ({
          task_id: task.id,
          name: part.name,
          price: part.price,
          result_price: part.result_price,
        }))
      : [];

    if (partTasks.length) await PartTask.bulkCreate(partTasks);

    const workTasks = Array.isArray(req.body.workTasks)
      ? req.body.workTasks.map((work) => ({
          task_id: task.id,
          name: work.name,
          price: work.price,
        }))
      : [];

    if (workTasks.length) await WorkTask.bulkCreate(workTasks);

    res.status(201).json({
      message: "Task created successfully",
      task: task,
      noteTasks: noteTasks,
      partTasks: partTasks,
      workTasks: workTasks,
    });
  } catch (error) {
    console.error("Something went wrong: ", error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

async function show(req, res) {
  const id = req.params.id;
  try {
    const task = await Task.findByPk(id);
    if (task) {
      const noteTasks = await NoteTask.findAll({ where: { task_id: id } });
      const partTasks = await PartTask.findAll({ where: { task_id: id } });
      const workTasks = await WorkTask.findAll({ where: { task_id: id } });
      res.status(200).json({
        task: task,
        noteTasks: noteTasks,
        partTasks: partTasks,
        workTasks: workTasks,
      });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error("Something went wrong: ", error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

async function index(req, res) {
  try {
    const tasks = await Task.findAll();
    const noteTasks = await NoteTask.findAll();
    const partTasks = await PartTask.findAll();
    const workTasks = await WorkTask.findAll();
    res.status(200).json({
      tasks: tasks,
      noteTasks: noteTasks,
      partTasks: partTasks,
      workTasks: workTasks,
    });
  } catch (error) {
    console.error("Something went wrong: ", error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

async function update(req, res) {
  const id = req.params.id;
  try {
    const task = await Task.findByPk(id);
    if (task) {
      await task.update({
        mark: req.body.mark,
        num: req.body.num,
        vin: req.body.vin,
        date: req.body.date,
        prepaid: req.body.prepaid,
        paidstate: req.body.paidstate,
      });

      if (Array.isArray(req.body.noteTasks)) {
        await NoteTask.destroy({ where: { task_id: id } });
        const noteTasks = req.body.noteTasks.map((note) => ({
          task_id: id,
          description: note.description,
        }));
        await NoteTask.bulkCreate(noteTasks);
      }

      if (Array.isArray(req.body.partTasks)) {
        await PartTask.destroy({ where: { task_id: id } });
        const partTasks = req.body.partTasks.map((part) => ({
          task_id: id,
          name: part.name,
          price: part.price,
          result_price: part.result_price,
        }));
        await PartTask.bulkCreate(partTasks);
      }

      if (Array.isArray(req.body.workTasks)) {
        await WorkTask.destroy({ where: { task_id: id } });
        const workTasks = req.body.workTasks.map((work) => ({
          task_id: id,
          name: work.name,
          price: work.price,
        }));
        await WorkTask.bulkCreate(workTasks);
      }

      res.status(200).json({
        message: "Task updated successfully",
        task: task,
      });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error("Something went wrong: ", error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

async function destroy(req, res) {
  const id = req.params.id;
  try {
    const task = await Task.findByPk(id);

    if (Array.isArray(req.body.noteTasks)) {
      await NoteTask.destroy({ where: { task_id: id } });
    }
    if (Array.isArray(req.body.partTasks)) {
      await PartTask.destroy({ where: { task_id: id } });
    }
    if (Array.isArray(req.body.workTasks)) {
      await WorkTask.destroy({ where: { task_id: id } });
    }
    if (task) {
      await task.destroy();
      res.status(200).json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
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
  show: show,
  index: index,
  update: update,
  destroy: destroy,
};
