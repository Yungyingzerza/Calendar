const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE, // Database name
  process.env.USER_DB, // Username
  process.env.PASSWORD, // Password
  {
    host: process.env.HOST, 
    dialect: "postgres", // Tell sequelize to use Postgres
  }
);
async function connect() {
  try {
    await sequelize.authenticate();
    console.log("Connection established successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

async function sync() {
  try {
    await sequelize.sync();
    console.log("Connection synced successfully");
  } catch (error) {
    console.error("Unable to sync to the database:", error);
  }
}

module.exports = {
  sequelize,
  connect,
  sync,
};