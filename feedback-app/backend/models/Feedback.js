const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const Activity = require('./Activity');

const Feedback = sequelize.define('Feedback', {
  emoji: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

Feedback.belongsTo(Activity, { foreignKey: 'activityId' });
Activity.hasMany(Feedback, { foreignKey: 'activityId' });

module.exports = Feedback;
