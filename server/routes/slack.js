'use strict'
const express = require('express')
const axios = require('axios')
const { DirectMessageConstructor } = require('../../middlewares')
const { formatMessage } = require('../utils/formatMessage')

const r = express.Router()

// TODO
// Map names/email to a file
// Add bot commands like
// Help, subscribe, My MRs, MR ###, Sup

r.post('/', (req, res, next) => {
  const payload = req.body.event;
  console.log(payload)
  // Payload Important info
  // type - action type 'app_mention', 'message'
  // text - content of the text
  // 

  axios(DirectMessageConstructor(formatMessage(type, body))).then(r => {
    return res.sendStatus(200)
  }).catch(e => {
    console.log('At the catch block' + e)
    return next(e + ' - got an ERROR')
  })
})

module.exports = r;