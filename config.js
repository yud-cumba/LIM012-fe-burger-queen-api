require('dotenv').config({ path: 'secrets.env' });

const db = {
  host: process.env.HOST,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DB_NAME,
};
// console.log(db);
exports.port = process.argv[2] || process.env.PORT || 8080;
exports.dbUrl = db;
exports.secret = process.env.JWT_SECRET;
exports.adminEmail = process.env.ADMIN_EMAIL;
exports.adminPassword = process.env.ADMIN_PASSWORD;
/**
 * PREGUNTAS:
 *
 */
