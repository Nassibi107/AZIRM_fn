const { DataTypes } = require('sequelize');

const db = require('../db/db.js');


const Donation = db.define('Donation', {
  idD: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.DECIMAL(8, 2),
  },
  type: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'donation',
  timestamps: true,
});

Donation.associate = (models) => {
  Donation.hasMany(models.User, { foreignKey: "donationId", as: "users" });
};

module.exports = Donation;
