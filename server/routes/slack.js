const express = require('express')
const axios = require('axios')

const r = express.Router()

r.post('/', (req, res, next) => {
  const payload = req.body.event;
  let text = ''
  if(payload.user === 'URDAKB6NN'){
    text = 'Hey handsome. Hope you doing well!! :*'
  }

  axios.post('https://slack.com/api/chat.postMessage', {
    token: process.env.BOT_TOKEN || require(config).get('bot.token'),
    channel: payload.channel,
    text: text || 'asdawdsa'
  })
  console.log(payload)
  res.sendStatus(200)
})

module.exports = r;