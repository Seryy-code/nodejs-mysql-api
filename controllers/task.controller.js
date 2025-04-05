const { Task, NoteTask, PartTask, WorkTask } = require("../models");

async function save(req, res) {
  try {
    const task = await Task.create({
      mark: req.body.mark,
      num: req.body.num,
      vin: req.body.vin,
      date: req.body.date,
      prepaid: req.body.prepaid,
      paidstate: req.body.paidstate,
    });

    if (Array.isArray(req.body.noteTasks)) {
      const noteTasks = req.body.noteTasks.map((note) => ({
        task_id: task.id,
        description: note.description,
      }));
      await NoteTask.bulkCreate(noteTasks);
    }

    if (Array.isArray(req.body.partTasks)) {
      const partTasks = req.body.partTasks.map((part) => ({
        task_id: task.id,
        name: part.name,
        price: part.price,
        result_price: part.result_price,
      }));
      await PartTask.bulkCreate(partTasks);
    }

    if (Array.isArray(req.body.workTasks)) {
      const workTasks = req.body.workTasks.map((work) => ({
        task_id: task.id,
        name: work.name,
        price: work.price,
      }));
      await WorkTask.bulkCreate(workTasks);
    }

    res.status(201).json({
      message: "Task created successfully",
      task,
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
    const task = await Task.findOne({
      where: { id },
      include: [NoteTask, PartTask, WorkTask],
    });
    if (task) {
      res.status(200).json(task);
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
    const tasks = await Task.findAll({
      include: [NoteTask, PartTask, WorkTask],
    });
    res.status(200).json(tasks);
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
        const existingNoteTasks = await NoteTask.findAll({
          where: { task_id: id },
        });
        const newNoteTaskIds = req.body.noteTasks.map((note) => note.id);

        const noteTasksToDelete = existingNoteTasks.filter(
          (note) => !newNoteTaskIds.includes(note.id)
        );
        await NoteTask.destroy({
          where: { id: noteTasksToDelete.map((note) => note.id) },
        });

        for (const note of req.body.noteTasks) {
          if (note.id) {
            await NoteTask.update(
              { description: note.description },
              { where: { id: note.id } }
            );
          } else {
            await NoteTask.create({
              task_id: id,
              description: note.description,
            });
          }
        }
      }

      if (Array.isArray(req.body.partTasks)) {
        const existingPartTasks = await PartTask.findAll({
          where: { task_id: id },
        });
        const newPartTaskIds = req.body.partTasks.map((part) => part.id);

        const partTasksToDelete = existingPartTasks.filter(
          (part) => !newPartTaskIds.includes(part.id)
        );
        await PartTask.destroy({
          where: { id: partTasksToDelete.map((part) => part.id) },
        });

        for (const part of req.body.partTasks) {
          if (part.id) {
            await PartTask.update(
              {
                name: part.name,
                price: part.price,
                result_price: part.result_price,
              },
              { where: { id: part.id } }
            );
          } else {
            await PartTask.create({
              task_id: id,
              name: part.name,
              price: part.price,
              result_price: part.result_price,
            });
          }
        }
      }

      if (Array.isArray(req.body.workTasks)) {
        const existingWorkTasks = await WorkTask.findAll({
          where: { task_id: id },
        });
        const newWorkTaskIds = req.body.workTasks.map((work) => work.id);

        const workTasksToDelete = existingWorkTasks.filter(
          (work) => !newWorkTaskIds.includes(work.id)
        );
        await WorkTask.destroy({
          where: { id: workTasksToDelete.map((work) => work.id) },
        });

        for (const work of req.body.workTasks) {
          if (work.id) {
            await WorkTask.update(
              { name: work.name, price: work.price },
              { where: { id: work.id } }
            );
          } else {
            await WorkTask.create({
              task_id: id,
              name: work.name,
              price: work.price,
            });
          }
        }
      }

      const updatedTask = await Task.findOne({
        where: { id },
        include: [NoteTask, PartTask, WorkTask],
      });

      res.status(200).json(updatedTask);
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
    if (task) {
      await NoteTask.destroy({ where: { task_id: id } });
      await PartTask.destroy({ where: { task_id: id } });
      await WorkTask.destroy({ where: { task_id: id } });

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
  save,
  show,
  index,
  update,
  destroy,
};
