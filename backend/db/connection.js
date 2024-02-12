// PG database client/connection setup
require("dotenv").config();
const { Pool } = require("pg");

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: "development",
  password: "development",
  database: process.env.DB_NAME,
};

const db = new Pool(dbParams);

db.connect();

module.exports = db;
