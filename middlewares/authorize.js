const connection = require('../database');

function authorize(roles) {
  return (req, res, next) => {
    const userId = req.user.id;

    connection.query('SELECT rol_id FROM usuarios WHERE id = ?', [userId], (err, results) => {
      if (err) throw err;
      const userRole = results[0].rol_id;

      if (!roles.includes(userRole)) {
        return res.status(403).json({ message: 'Acceso denegado. Permisos insuficientes.' });
      }

      next();
    });
  };
}

module.exports = authorize;
