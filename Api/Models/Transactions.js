const { DataTypes } = require("sequelize");
const db = require('../db/db');

const Transactions = db.define("Transactions", {
  team_member_id : {
    type: DataTypes.STRING,
  },
  name : {
    type: DataTypes.STRING,
  },
  totalPayments : {
    type: DataTypes.DOUBLE,
  }
});


module.exports = Transactions;
