'use strict'
const express = require('express')
const axios = require('axios')
const { DirectMessageConstructor } = require('../../middlewares')
const { formatMessage } = require('../utils/formatMessage')

const r = express.Router()

r.post('/', (req, res, next) => {
  axios(DirectMessageConstructor(formatMessage(type, req.body))).then(r => {
    return res.sendStatus(200)
  }).catch(e => {
    return next(e + ' - got an ERROR')
  })
})

module.exports = r;