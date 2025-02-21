const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Task = sequelize.define(
  "Task",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    mark: { type: DataTypes.STRING, allowNull: false },
    num: { type: DataTypes.STRING, allowNull: false },
    vin: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    prepaid: { type: DataTypes.DECIMAL(10, 2) },
    paidstate: { type: DataTypes.INTEGER },
  },
  {
    tableName: "task",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Task;
