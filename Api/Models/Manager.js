const { DataTypes } = require('sequelize');

const db = require('../db/db.js');

const Manager = db.define('Manager', {
  mRef: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  references : {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

Manager.associate = (models) => {
  Manager.belongsTo(models.Company, { foreignKey: "idCmp", as: "company" });
  Manager.hasMany(models.User, { foreignKey: "managerId", as: "users" });
};

module.exports = Manager;
