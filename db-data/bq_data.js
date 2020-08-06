const mysql = require('mysql');
const config = require('../config');

const { dbUrl } = config;
const pool = mysql.createConnection(dbUrl);
// eslint-disable-next-line no-console
console.log(pool.state);
pool.connect();
module.exports = pool;
