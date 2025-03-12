const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "NoteTask",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      task_id: { type: DataTypes.INTEGER, allowNull: false },
      description: { type: DataTypes.TEXT },
    },
    {
      tableName: "notetask",
      freezeTableName: true,
      timestamps: false,
    }
  );
};
