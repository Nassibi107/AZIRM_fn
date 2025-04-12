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
  type:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  lat:{
    type: DataTypes.DOUBLE,
    defaultValue:0.0
  },
  lng:{
    type: DataTypes.DOUBLE,
    defaultValue:0.0
  },
  feed :{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  
});

Donation.associate = (models) => {
  Donation.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  Donation.hasMany(models.Don_Details, {
    foreignKey: "donationId",
    as: "details"
  });
};

module.exports = Donation;


