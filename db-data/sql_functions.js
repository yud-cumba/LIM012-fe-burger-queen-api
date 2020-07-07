const pool = require('./bq_data');

const getDataByKeyword = (table, keyword, value) => new Promise((resolve, reject) => {
  pool.query(`SELECT * FROM ${table} WHERE ${keyword}=?`, value, (error, result) => {
    if (result.length > 0) {
      resolve(result);
    } else {
      reject(error);
    }
  });
});

const postData = (table, toInsert) => new Promise((resolve, reject) => {
  pool.query(`INSERT INTO ${table} SET ?`, toInsert, (error, result) => {
    resolve(result);
    reject(error);
  });
});

const updateDataByKeyword = (table, toUpdate, keyword, value) => new Promise((resolve, reject) => {
  pool.query(`UPDATE ${table} SET ? WHERE ${keyword} = ?`, [toUpdate, value], (error, result) => {
    resolve(result);
    reject(error);
  });
});

const deleteData = (table, id, idValue) => new Promise((resolve, reject) => {
  pool.query(`DELETE FROM ${table} WHERE ${id} = ?`, idValue, (error, result) => {
    resolve(result);
    reject(error);
  });
});

module.exports = {
  getDataByKeyword,
  postData,
  updateDataByKeyword,
  deleteData,
};
