const express = require('express')
const axios = require('axios')
const config = require('config')
const checkToken = require('../../middlewares').checkToken

const r = express.Router();


r.get('/', (req, res, next) => {
  console.log(req)
  return res.send('Welcome to Rotom, More than a Bot, a BOT!')
})

r.post('/', checkToken, (req, res, next) => {
  console.log(req.body)
  return res.send('Got a POST')
})

r.get('/test',(req, res, next) => {
 axios.post(
      `https://hooks.slack.com/services/${config.get('slack.token')}`,
      {
        text: 'YO YO!!'
      }).then(r => {
        console.log(r)
        return res.send('Testing...')
      }).catch(e => {
        console.log(e)
        return res.send('Something went really bad!')
      })
})

module.exports = r;