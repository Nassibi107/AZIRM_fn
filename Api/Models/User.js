const { DataTypes } = require('sequelize');
const db = require('../db/db.js');

const User = db.define('User', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  emailAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'manager', 'user'),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  income: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  tableName: 'user',
  timestamps: true,
});

User.associate = (models) => {
  User.belongsTo(models.Manager, { foreignKey: "managerId", as: "manager" });
  User.belongsTo(models.Donation, { foreignKey: "donationId", as: "donation" });
};

module.exports = User;