/* eslint-disable no-unused-vars */
const mysql = require('mysql');
const config = require('../config');

const { dbUrl } = config;
const pool = mysql.createConnection(dbUrl);
// pool.connect();
pool.connect((err) => {
  if (err) throw err;
});
const createTable = (table, values) => {
  const sql = `CREATE TABLE IF NOT EXISTS ${table} ${values}`;
  pool.query(sql, (err, result) => {
    if (err) throw err;
  });
};

const userValues = '(_id int NOT NULL AUTO_INCREMENT,email VARCHAR(30), address VARCHAR(255), `password` text, rolesAdmin boolean, PRIMARY KEY (_id))';
const productsValues = '(_id INTEGER NOT NULL AUTO_INCREMENT, name varchar(50), price float(2), image text, type varchar(50), dateEntry date, primary key (_id))';
const ordersProductsValues = '(orderId integer, qty integer, productId INTEGER)';
const ordersValues = '(_id INTEGER NOT NULL AUTO_INCREMENT, userId INTEGER NOT NULL, client varchar(20), status varchar(20), dateEntry date, dateProcessed date, PRIMARY KEY (_id))';
createTable('users', userValues);
createTable('products', productsValues);
createTable('orders', ordersValues);
createTable('orders_products', ordersProductsValues);

module.exports = pool;
