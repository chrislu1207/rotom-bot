const express = require('express')

const r = express.Router()

r.post('/', (req, res, next) => {
  const challenge = req.body.challenge || 'no challenge';
  res.send({challenge})
})