const express = require('express')
const axios = require('axios')
const config = require('config')
const r = express.Router();


r.get('/', (req, res, next) => {
  console.log(req)
  return res.send('WHY')
})

r.get('/test', async (req, res, next) => {
  try {
    const resp = await axios.post(
      `https://hooks.slack.com/services/${config.get('slack.token')}`,
      {
        text: 'YO YO!!'
      })
    console.log(resp)
    return res.send('okay')
  } catch (error) {
    return res.send('Something went really bad!')
  }
})

module.exports = r;