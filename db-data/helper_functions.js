const pool = require('./bq_data');

// eslint-disable-next-line max-len
const isUserEmailInRecord = (result, userdetails) => result.some((userDB) => userDB.email === userdetails.email);
const getUserByUid = (result, uid) => result.filter((ele) => ele.id === Number(uid));

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
  updateuser,
};
