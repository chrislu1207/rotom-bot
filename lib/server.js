const express = require('express')
const server = express()

server.get('/', (req, res) => {
  console.log(req, "request")
  res.send('Works')
})

module.exports = { server }

