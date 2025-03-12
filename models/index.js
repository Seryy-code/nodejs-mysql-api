const { Sequelize } = require("sequelize");
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

const Task = require("./task")(sequelize);
const NoteTask = require("./notetask")(sequelize);
const PartTask = require("./parttask")(sequelize);
const WorkTask = require("./worktask")(sequelize);

module.exports = { sequelize, Task, NoteTask, PartTask, WorkTask };
