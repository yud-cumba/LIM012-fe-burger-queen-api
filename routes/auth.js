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
  app.post('/auth', async (req, resp, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(400);
    }

    // TODO: autenticar a la usuarix
    // const payload = { uid: user.idUsers, email: user.email, roles: user.rolesAdmin };
    // return resp.send({ message: 'authentication successful', token: jwt.sign(payload, secret) });

    const query = await pool.query('SELECT * FROM auth ', (error, result) => {
      console.log('vaina');
      if (error) throw error;
      return result.some((user) => user.email === email && user.passwordAuth === password);
      // if (result.some((user) => user.email === email && user.passwordAuth === password)) {
      // const token = jwt.sign({ email }, 'enviroment_var');
      // resp.send('hola');
      // resp.json({
      //   token,
      // });
      // }
    });
    // console.log(query);
    // resp.send(query);
    if (query) {
      const token = jwt.sign({ email }, 'enviroment_var');
      // resp.send('hola');
      resp.json({
        token,
      });
    }

    next();
  });
  return nextMain();
};
