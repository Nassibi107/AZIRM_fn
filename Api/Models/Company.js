const { DataTypes } = require('sequelize');
const db = require('../db/db.js');

const Company = db.define('Company', {
  cmpID: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Company.associate = (models) => {
  Company.hasMany(models.Manager, { foreignKey: "idCmp", as: "managers" });
};

module.exports = Company;
