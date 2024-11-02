const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Habilita CORS para aceptar solicitudes desde el frontend
app.use(express.json()); // Para analizar solicitudes con JSON

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // **********Cambia si tu contraseña es diferente***********
    password: 'root', // ******Cambia si tu contraseña es diferente***********
    database: 'Watty'
});

db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;  }
    console.log('Connected to MySQL database');
});

// 1. Aquí se realizará el INSERT del nuevo usuario. 
// Ruta para registrar un usuario
app.post('/register', (req, res) => {
  const { Run_User, Nom_User, Correo_User, Celular_User, Contra_User, FechaCreacion_User } = req.body;

  // Verificación de datos
  if (!Run_User || !Nom_User || !Correo_User || !Contra_User || !Celular_User) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  // SQL query para insertar el usuario
  const query = `INSERT INTO USUARIO (Run_User, Nom_User, Correo_User, Celular_User, Contra_User, FechaCreacion_User) 
                 VALUES (?, ?, ?, ?, ?, NOW())`; // Id_Estado lo dejamos en 1 como estado inicial

  db.query(query, [Run_User, Nom_User, Correo_User, Celular_User, Contra_User, FechaCreacion_User], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'El usuario ya existe' });
      }
      return res.status(500).json({ error: 'Error al registrar el usuario' });
    }
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  });
});

// Ruta para el login del usuario (Obtener los datos de la consulta)
app.post('/login', (req, res) => {
  const { Correo_User, Contra_User } = req.body;

  if (!Correo_User || !Contra_User) {
    return res.status(400).json({ error: 'Correo y contraseña son requeridos' });
  }

  const query = `
  SELECT Id_User, Nom_User, Correo_User, Celular_User
  FROM USUARIO
  WHERE Correo_User = ? AND Contra_User = ?`;
  db.query(query, [Correo_User, Contra_User], (err, result) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    if (result.length > 0) {
      res.status(200).json({ message: 'Login exitoso', user: result[0] });
    } else {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  });
});



// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });