// Models Index (index.js)
const { Sequelize } = require('sequelize');
const db = require('../db/db');

const User = require('./User');
const Manager = require('./Manager'); 
const Donation = require('./Donation'); 
const Company = require('./Company');


const models = {
    User,
    Manager,
    Donation,
    Company,
};

// Establish associations
Object.keys(db).forEach((model) => {
  if (db[model].associate) {
    db[model].associate(db);
  }
});


module.exports = models;
