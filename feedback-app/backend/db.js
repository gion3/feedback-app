const { Sequelize } = require('sequelize');

// Creem conexiune la Sqlite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', 
});

module.exports = sequelize;
