require("dotenv").config();
var mariadb = require("mariadb");
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connection_limit: 5
});
module.exports = pool; 