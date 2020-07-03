const pool = require('../db-data/bq_data');

const getData = (table, callback) => {
  pool.query(`SELECT * FROM ${table}`, (error, result) => {
    callback(error, result);
  });
};

const getDataById = (table, id, idValue, callback) => {
  pool.query(`SELECT * FROM ${table} WHERE ${id}=?`, idValue, (error, result) => {
    callback(error, result);
  });
};

const postData = (table, toInsert, callback) => {
  pool.query(`INSERT INTO${table}SET ?`, toInsert, (error, result) => {
    callback(error, result);
  });
};

const updateData = (table, toUpdate, id, idValue, callback) => {
  pool.query(`UPDATE${table} SET ? WHERE${id} = ?`, [toUpdate, idValue], (error, result) => {
    callback(error, result);
  });
};
const deleteData = (table, id, idValue, callback) => {
  pool.query(`DELETE FROM ${table} WHERE ${id} = ?`, idValue, (error, result) => {
    callback(error, result);
  });
};

module.exports = {
  getData,
  getDataById,
  postData,
  updateData,
  deleteData,
};
