const jwt = require('jsonwebtoken'); // middleware
const pool = require('../db-data/bq_data');

module.exports = (secret) => (req, resp, next) => {
  const { authorization } = req.headers;

  if (!authorization) { // si no hay token
    return next();
  }

  const [type, token] = authorization.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    return next();
  }

  jwt.verify(token, secret, async (err, decodedToken) => {
    if (err) {
      return next(403);
    }
    // TODO: Verificar identidad del usuario usando `decodedToken.uid`
    try {
      await pool.query('SELECT * FROM users', (error, result) => {
        if (error) { throw error; }
        const userVerified = result.find((user) => user.email === decodedToken.email);
        if (userVerified) {
          req.user = userVerified;
          // console.log(`middleware decode token ${req.user}`);
          next();
        } else { next(404); }
      });
    } catch (error) {
      next(404);
    }
  });
};

module.exports.isAuthenticated = (req) => {
  if (req.user) {
    return true;
  }
  return false;
};

module.exports.isAdmin = (req) => {
  // TODO: decidir por la informacion del request si la usuaria es admin
  if (req.user.rolesAdmin) {
    return true;
  }
  return false;
};

/* module.exports.isMyRecord = (req) => {
 if(req.user.email === )
}; */

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
