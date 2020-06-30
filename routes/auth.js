const jwt = require('jsonwebtoken');
const config = require('../config');
const pool = require('../db-data/bq_data');

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
  app.post('/auth', (req, resp, next) => {
    const { email, password } = req.body;

    // TODO: autenticar a la usuarix
    pool.query('SELECT * FROM users ', (error, result) => {
      if (error) throw error;
      result.map((user) => {
        const payload = { uid: user.idUsers, email: user.email, roles: user.rolesAdmin };
        resp.send({ message: 'authentication successful', token: jwt.sign(payload, secret) });
      });
    });

    if (!email || !password) {
      return next(400);
    }
    next();
  });
  return nextMain();
};
