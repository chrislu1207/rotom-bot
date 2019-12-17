const express = require('express')
const server = express()

server.get('/', (req, res) => {
  res.send('Works')
})

module.exports = { server }

