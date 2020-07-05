// const query = require('../db-data/sql_functions');
const pool = require('../db-data/bq_data');

module.exports = {
  getUsers: (req, resp, next) => {
    // console.log(Object.keys(req));
    console.log(Object.keys(req.socket));
    // console.log(req.socket);
    
    pool.query('SELECT * FROM users', (error, result) => {
      if (error) throw error;
      resp.status(200).send(result);
    });
  },
};
