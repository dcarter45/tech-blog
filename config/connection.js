require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      
      dialectOptions: {
        // options: {
        //   requestTimeout: 300000
        // },
        decimalNumbers: true,
      }
    });

module.exports = sequelize;