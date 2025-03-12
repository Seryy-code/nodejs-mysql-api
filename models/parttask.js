const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "PartTask",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      task_id: { type: DataTypes.INTEGER, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.DECIMAL(10, 2) },
      result_price: { type: DataTypes.DECIMAL(10, 2) },
    },
    {
      tableName: "parttask",
      freezeTableName: true,
      timestamps: false,
    }
  );
};
