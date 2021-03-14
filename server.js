const express = require('express')
const app = express()
const port = 4444

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</>')
})

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`)
})