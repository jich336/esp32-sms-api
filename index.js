const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware para permitir peticiones desde el navegador
app.use(cors());
app.use(bodyParser.json());

// Variables en memoria (se reinician si el servidor se reinicia)
let mensaje = '';
let numero = '';

// Ruta raíz opcional para verificar si el servidor está activo
app.get('/', (req, res) => {
  res.send('Servidor ESP32-SMS activo.');
});

// Ruta para recibir los datos desde la web
app.post('/api/enviar', (req, res) => {
  mensaje = req.body.mensaje;
  numero = req.body.numero;

  console.log('Datos recibidos:');
  console.log('Número:', numero);
  console.log('Mensaje:', mensaje);

  res.json({ status: 'Mensaje recibido en el servidor' });
});

// Ruta para que el ESP32 consulte los datos
app.get('/api/dato', (req, res) => {
  res.json({ mensaje, numero });

  // Una vez enviados, los vacía para no reenviar siempre el mismo
  mensaje = '';
  numero = '';
});

// Puerto para Render (usa PORT de entorno o 3000 localmente)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
