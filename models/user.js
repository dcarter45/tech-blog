// module.exports = (sequelize, DataTypes) => {
//     const User = sequelize.define('User', {
//       username: DataTypes.STRING,
//       password: DataTypes.STRING
//     }, {});
//     User.associate = function(models) {
//       // associations can be defined here
//     };
    
//     return User;
//   };

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    user_username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    user_password: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    },
      {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
      }
);

module.exports= User;