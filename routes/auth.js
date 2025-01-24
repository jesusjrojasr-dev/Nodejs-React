const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../database');
require('dotenv').config(); // Cargar las variables de entorno

router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password, rol_id } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    connection.query('INSERT INTO usuarios (nombre, email, password, rol_id) VALUES (?, ?, ?, ?)', [nombre, email, hashedPassword, rol_id], (err, results) => {
      if (err) throw err;
      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    connection.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
      if (err) throw err;
      if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
      const token = jwt.sign({ id: results[0].id, rol_id: results[0].rol_id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  });
  

module.exports = router;
