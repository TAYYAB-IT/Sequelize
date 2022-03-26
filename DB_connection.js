const {Sequelize} = require('sequelize');

const db = new Sequelize('test-db', 'user', 'pass',{
  dialect: "sqlite",
  host: './dev.sqlite',
  // disable logging; default: console.log
  logging: false
});

module.exports = db;