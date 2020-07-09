const mysql = require('mysql');

const database = {
  host: 'localhost',
  user: 'fantadnj_bq_1',
  password: 'R$;DMlD+FkOq',
  database: 'fantadnj_burguer_queen_1',
};

const pool = mysql.createPool(database);
module.exports = pool;
