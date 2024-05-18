require("dotenv").config();
const storage = require('./service/storage');

module.exports = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    charset: "utf8",
  },
  pool: { min: 0, max: 10 }
};
