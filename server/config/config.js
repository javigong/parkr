const mysql = require("mysql2");
const env = require('dotenv');
env.config();

const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_DATABASE = process.env.DB_DATABASE
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USERNAME,
    database: DB_DATABASE,
    password: DB_PASSWORD
});

module.exports = pool;