const mysql = require('mysql');
const config = require('../config');

const { dbUrl } = config;
const pool = mysql.createConnection(dbUrl);
// pool.connect();
pool.connect((err) => {
  if (err) throw err;
});
module.exports = pool;
