'use strict';
const express = require('express');
const axios = require('axios');
const { checkToken } = require('../../middlewares');
const { formatMessage } = require('../utils/formatMessage');
const { GroupMessageConstructor, DirectMessageConstructor } = require('../../middlewares')
const r = express.Router();


r.post('/', checkToken, (req, res, next) => {
  const type = req.get('X-Gitlab-Event');
  console.log(type, '- TYPE')
  console.log(req.body, '- BODY REQ')
  if (type === 'Note Hook') {
    return axios(DirectMessageConstructor(formatMessage(type, req.body), req.body.user.username))
      .then(r => {
        return res.sendStatus(200)
      })
      .catch(e => {
        console.log(e);
        return res.send('Something went really bad!');
      });
  }
  if (type === 'Merge Request Hook' && req.body.object_attributes.work_in_progress) return res.sendStatus(200)
  return axios(GroupMessageConstructor(formatMessage(type, req.body)))
    .then(r => {
      return res.sendStatus(200)
    })
    .catch(e => {
      console.log(e);
      return res.send('Something went really bad!');
    });
})

module.exports = r;
