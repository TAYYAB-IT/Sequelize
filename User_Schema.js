const sequelize = require("./DB_connection");
const { DataTypes } = require("sequelize");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
   
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  

});

module.exports = User;