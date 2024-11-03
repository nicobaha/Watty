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

//Obtener ambientes de manera dinámica según el Id_User.
app.get('/ambientes/:Id_User', (req, res) => {
  const { Id_User } = req.params;

  if (!Id_User) {
    return res.status(400).json({ error: 'Id_User es requerido' });
  }

  const query = `
    SELECT AMBIENTE.Id_Ambiente, tipo_ambiente.Nombre_TipoAmb, AMBIENTE.Nombre_Ambiente
    FROM AMBIENTE
    INNER JOIN tipo_ambiente ON AMBIENTE.Id_TipoAmb = tipo_ambiente.Id_TipoAmb
    WHERE ID_USER=?;
  `;

  db.query(query, [Id_User], (err, results) => {
    if (err) {
      console.error('Error al obtener ambientes:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    // Verificar si se encontraron resultados
    if (results.length > 0) {
      res.status(200).json({ ambientes: results });
    } else {
      res.status(404).json({ message: 'No se encontraron ambientes para este usuario' });
    }
  });
});

// Obtener tipo_ambiente
app.get('/Tipoambientes', (req, res) => {
  const query = 'select * from tipo_ambiente;';
  db.query(query, (err, results) => { 
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

//Insertar Ambientes
app.post('/InsertAmbientes', (req, res) => {
  console.log('Datos recibidos en la solicitud:', req.body); // Agrega esto para ver los datos recibidos
  const { Nombre_Ambiente, Id_User, Id_TipoAmb } = req.body;

  const query = 'INSERT INTO AMBIENTE (Nombre_Ambiente, Id_User, Id_TipoAmb) VALUES (?, ?, ?)';
  db.query(query, [Nombre_Ambiente, Id_User, Id_TipoAmb], (err, result) => {
    if (err) {
      console.error('Error al insertar ambiente:', err);
      return res.status(500).json({ error: 'Error al insertar ambiente' });
    }
    res.status(201).json({ message: 'Ambiente insertado con éxito' });
  });
});

//Eliminar Ambiente
app.delete('/EliminarAmbientes/:Id_Ambiente', (req, res) => {
  const { Id_Ambiente } = req.params;

  const query = 'DELETE FROM AMBIENTE WHERE Id_Ambiente = ?';
  db.query(query, [Id_Ambiente], (err, result) => {
    if (err) {
      console.error('Error al eliminar ambiente:', err);
      return res.status(500).json({ error: 'Error al eliminar el ambiente' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Ambiente no encontrado' });
    }
    res.status(200).json({ message: 'Ambiente eliminado con éxito' });
  });
});



// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });