const express = require('express')
const calculo = require('./calculo.js')
const app = express()
const port = 4444

// Ruta principal GET
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</>')
})

// Ruta principal POST
app.post('/',(req, res) => {
  respuesta = calculo.sueldo(JSON.parse(req.query.datos))
  res.status(200).send(JSON.stringify(respuesta))
})

// Se inicializa el servidor en el puerto designado
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`)
})