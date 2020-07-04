// const query = require('../db-data/sql_functions');
const pool = require('../db-data/bq_data');

module.exports = {
  getUsers: (req, resp, next) => {
    // console.log(Object.keys(req.complete));
    // en esta peticion me sale ERROR [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    pool.query('SELECT * FROM users', (error, result) => {
      if (error) throw error;
      resp.send(result);
      next();
    });
  },
};
