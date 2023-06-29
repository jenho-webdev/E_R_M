// Enable access to .env variables
require("dotenv").config();

const Sequelize = require("sequelize");

// Use environment variables to connect to database

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    port: 3306,
    logging: true, // Disable console logging of executed queries
  }
);

module.exports = sequelize;
