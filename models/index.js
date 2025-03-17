const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.json")["development"];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.port || 3306,
  }
);

const Task = require("./task")(sequelize, DataTypes);
const NoteTask = require("./notetask")(sequelize, DataTypes);
const PartTask = require("./parttask")(sequelize, DataTypes);
const WorkTask = require("./worktask")(sequelize, DataTypes);

Task.hasMany(NoteTask, { foreignKey: "task_id" });
NoteTask.belongsTo(Task, { foreignKey: "task_id" });

Task.hasMany(PartTask, { foreignKey: "task_id" });
PartTask.belongsTo(Task, { foreignKey: "task_id" });

Task.hasMany(WorkTask, { foreignKey: "task_id" });
WorkTask.belongsTo(Task, { foreignKey: "task_id" });

module.exports = { sequelize, Task, NoteTask, PartTask, WorkTask };
