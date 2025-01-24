const express = require('express');
const router = express.Router();
const connection = require('../database');
const authenticateToken = require('../middlewares/auth');

router.get('/users', authenticateToken, (req, res) => {
    connection.query('SELECT * FROM usuarios', (err, results) => {
        if (err) throw err;
        res.status(200).json(results);
    });
});

router.get('/users/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(results[0]);
    });
});

router.put('/users/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const { nombre, email, rol_id } = req.body;
    connection.query('UPDATE usuarios SET nombre = ?, email = ?, rol_id = ? WHERE id = ?', [nombre, email, rol_id, id], (err, results) => {
        if (err) throw err;
        res.status(200).json({ message: 'Usuario actualizado exitosamente' });
    });
});

router.delete('/users/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM usuarios WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    });
});

module.exports = router;
