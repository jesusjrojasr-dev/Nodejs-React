const express = require('express');
const http = require('http');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestion_usuarios'
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
});

// Rutas de autenticación
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

// Rutas de gestión de usuarios
const userRoutes = require('./routes/user');
app.use('/api', userRoutes);

// Ruta de prueba para verificar la conexión a la base de datos
app.get('/api/db-connection', (req, res) => {
    connection.query('SELECT 1', (err, results) => {
        if (err) {
            console.error('Error al conectar a la base de datos:', err);
            res.status(500).json({ message: 'Error al conectar a la base de datos', error: err });
        } else {
            res.status(200).json({ message: 'Conexión a la base de datos exitosa', results: results });
        }
    });
});

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor corriendo correctamente');
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
