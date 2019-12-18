'use strict'
const express = require('express')
const axios = require('axios')

const r = express.Router()

r.post('/', (req, res, next) => {
  const payload = req.body.event;
  console.log(req.body)
  console.log(payload)

  axios.post('https://slack.com/api/chat.postMessage', {
    channel: payload.channel,
    text: 'asdawdsa'
  }, {headers: {
    'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.BOT_TOKEN || require('config').get('bot.token')}`
  }}).then(r => {
    return res.sendStatus(200)
  }).catch(e => {
    return next(`${e}, got an ERROR`)
  })
})

module.exports = r;