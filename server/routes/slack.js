'use strict'
const express = require('express')
const axios = require('axios')

const r = express.Router()

r.post('/', (req, res, next) => {
  const payload = req.body.event;
  const token = process.env.BOT_TOKEN || require('config').get('bot.token')
  console.log('Bearer ' + token)
  console.log(payload)

  axios( 
  {
    method: 'post',
    url: 'https://slack.com/api/chat.postMessage',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    data: {
      channel: payload.user,
      text: 'Bro! leave me alone!'
    }
  }).then(r => {
    console.log('At the response', r)
    return res.sendStatus(200)
  }).catch(e => {
    console.log('At the catch block' + e)
    return next(e + ' - got an ERROR')
  })
})

module.exports = r;