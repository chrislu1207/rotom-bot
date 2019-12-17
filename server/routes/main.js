const express = require('express')
const axios = require('axios')
const config = require('config')
const r = express.Router();


r.get('/', (req, res, next) => {
  console.log(req)
  res.send('WHY')
})

r.get('/test', async (req, res, next) => {
  try {
    const resp = await axios.post(
      `https://hooks.slack.com/services/${config.get('slack.token')}`,
      {
        text: 'YO YO!!'
      })
    console.log(resp)
    res.send('okay')
  } catch (error) {
    res.send('Something went really bad!')
  }
})

module.exports = r;