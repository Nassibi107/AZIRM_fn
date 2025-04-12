const { DataTypes } = require("sequelize");
const db = require('../db/db');
const models = require(".");


const Don_Details = db.define("Don_Details",
{
    idDD: {
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
   feed : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
   num_p : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    donationId: {
        type: DataTypes.BIGINT,
        allowNull: false
    }}
);

Don_Details.associate = (models) => {
    Don_Details.belongsTo(models.Donation, {
      foreignKey: "donationId",
      as: "donation"
    });
  };



module.exports = Don_Details;