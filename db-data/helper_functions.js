const pool = require('../db-data/bq_data');

// eslint-disable-next-line max-len
const isUserEmailInRecord = (result, userdetails) => result.some((userDB) => userDB.email === userdetails.email);
const getUserByUid = (result, uid) => result.filter((ele) => ele.id === Number(uid));

const askDBforUser = (userdetails, callback) => {
  pool.query('SELECT * FROM users', (error, result) => {
    if (error) throw error;
    return callback(result, userdetails);
  });
};

const addUser = (newRecord, resp) => {
  pool.query('INSERT INTO users SET ?', newRecord, (error, newUser) => {
    if (error) throw error;
    return resp.status(200).send(
      {
        _id: newUser.insertId,
        user: newRecord.email,
        roles: { admin: newRecord.rolesAdmin },
      },
    );
  });
};
const updateuser = (updateDetails, uid, _resp) => {
  pool.query('UPDATE users SET ? WHERE id = ?', [updateDetails, uid], (error, result) => {
    if (error) throw error;
    return _resp.status(200).send(updateDetails);
  });
};

// READ USERS TABLE
module.exports = {
  isUserEmailInRecord,
  getUserByUid,
  askDBforUser,
  addUser,
  updateuser,
};
