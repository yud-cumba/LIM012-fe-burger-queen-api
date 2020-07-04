const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const pool = require('../db-data/bq_data');
const auth = require('../middleware/auth');

const { secret } = config;

/** @module auth */
module.exports = (app, nextMain) => {
  /**
   * @name /auth
   * @description Crea token de autenticación.
   * @path {POST} /auth
   * @body {String} email Correo
   * @body {String} password Contraseña
   * @response {Object} resp
   * @response {String} resp.token Token a usar para los requests sucesivos
   * @code {200} si la autenticación es correcta
   * @code {400} si no se proveen `email` o `password` o ninguno de los dos
   * @auth No requiere autenticación
   */
  app.post('/auth', async (req, resp, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(400);
    }
    console.log(`TOKEN/ auth email:${email} ${password}`);
    // TODO: autenticar a la usuarix
    try {
      await pool.query('SELECT * FROM users', (error, result) => {
        if (error) throw error;
        const payload = result.find((user) => user.email === email && bcrypt.compareSync(password, user.userpassword));
        if (payload) {
          const token = jwt.sign({ email: payload.email, password: payload.userpassword }, secret);
          resp.header('authorization', token);
          resp.status(200).send({ message: 'succesful', token });
        } else {
          next(404);
        }
      });
    } catch (error) {
      return error;
    }
    // next();
  });
  console.log('salgo de auth');
  return nextMain();
};
