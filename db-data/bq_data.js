const mysql = require('mysql');
const config = require('../config');

const { dbUrl } = config;

const pool = mysql.createConnection(dbUrl);
pool.connect();
module.exports = pool;
