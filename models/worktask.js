const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "WorkTask",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      task_id: { type: DataTypes.INTEGER, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.DECIMAL(10, 2) },
    },
    {
      tableName: "worktask",
      freezeTableName: true,
      timestamps: false,
    }
  );
};
