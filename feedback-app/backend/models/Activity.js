const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db'); // Importă conexiunea la baza de date

const Activity = sequelize.define('Activity', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Activity;
