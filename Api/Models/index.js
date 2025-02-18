// Models Index (index.js)
const { Sequelize } = require('sequelize');
const db = require('../db/db');
const User = require("./User");
const Company = require("./Company");
const Donation = require("./Donation");

const models = { User, Company, Donation };

// Apply associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = models;
