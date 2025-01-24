const jwt = require('jsonwebtoken');
require('dotenv').config(); // Cargar las variables de entorno

function authenticateToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1]; // Obtener el token sin el prefijo "Bearer"
  if (!token) return res.status(401).json({ message: 'Acceso denegado' });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token inválido' });
  }
}

module.exports = authenticateToken;
