
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let mensaje = '';
let numero = '';

app.post('/api/enviar', (req, res) => {
  mensaje = req.body.mensaje;
  numero = req.body.numero;
  res.json({ status: 'Mensaje recibido en el servidor' });
});

app.get('/api/dato', (req, res) => {
  res.json({ mensaje, numero });
  mensaje = '';
  numero = '';
});

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});
