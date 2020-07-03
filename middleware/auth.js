const jwt = require('jsonwebtoken'); // middleware
const pool = require('../db-data/bq_data');


module.exports = (secret) => (req, resp, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next();
  }

  const [type, token] = authorization.split(' ');
  // console.log(req);


  if (type.toLowerCase() !== 'bearer') {
    return next();
  }

  jwt.verify(token, secret, async (err, decodedToken) => {
    if (err) {
      return next(403);
    }
    // TODO: Verificar identidad del usuario usando `decodedToken.uid`
    try {
      const verified = await pool.query('SELECT * FROM users', (error, result) => {
        if (error) { throw error; }
        const checkDB = result.some((user) => user.email === decodedToken.email);
        if (checkDB) { req.user = verified; } else { next(404); }
      });
    } catch (error) {
      next(404);
    }

    // console.log(decodedToken.email);
  });
};


module.exports.isAuthenticated = (req) => (
  // TODO: decidir por la informacion del request si la usuaria esta autenticada
  console.log(req.user)
  // false
);

module.exports.isAdmin = (req) => (
  // TODO: decidir por la informacion del request si la usuaria es admin

  true
);


module.exports.requireAuth = (req, resp, next) => (
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : next()
);


module.exports.requireAdmin = (req, resp, next) => (
  // eslint-disable-next-line no-nested-ternary
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : (!module.exports.isAdmin(req))
      ? next(403)
      : next()
);
