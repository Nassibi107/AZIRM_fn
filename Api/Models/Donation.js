const { DataTypes } = require("sequelize");
const db = require('../db/db');


const Donation = db.define("Donation", {
  idD: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Donation.associate = (models) => {
  Donation.belongsTo(models.User, { foreignKey: "userId", as: "user" });
};

module.exports = Donation;

