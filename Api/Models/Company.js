const { DataTypes } = require("sequelize");

const db = require('../db/db');
const Company = db.define("Company", {
  cmpID: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Company.associate = (models) => {
  Company.hasMany(models.User, { foreignKey: "CmpRid", as: "user" });
};

module.exports = Company;
