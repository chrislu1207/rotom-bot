const express = require('express')

const r = express.Router()

r.post('/', (req, res, next) => {
  const payload = req.body.event;
  console.log(payload)
  res.sendStatus(200)
})

module.exports = r;