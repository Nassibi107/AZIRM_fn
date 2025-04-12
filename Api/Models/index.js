// Models Index (index.js)
const { Sequelize } = require('sequelize');
const db = require('../db/db');
const User = require("./User");
const Company = require("./Company");
const Donation = require("./Donation");
const Transactions = require("./Transactions");
const Don_Details = require("./Don_Details");
const models = { User, Company, Donation , Transactions ,Don_Details};

// Apply associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = models;
