'use strict';
const express = require('express');
const axios = require('axios');
const checkToken = require('../../middlewares').checkToken;

const r = express.Router();

const formatMessage = require('../utils/formatMessage');
const pushEvent = require('../test/push');
const mergeRequestEvent = require('../test/merge-request');
const noteEvent = require('../test/note');

const axiosConstructor = (formattedMessage) => {
  return {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    url: `https://hooks.slack.com/services/${process.env.TOKEN || require('config').get('slack.token')}`,
    data: formattedMessage
  }
}

r.post('/', checkToken, (req, res, next) => {
  const type = req.get('X-Gitlab-Event');
  console.log(type, '- TYPE')
  console.log(req.body, '- BODY REQ')
  if (type === 'Merge Request Hook' && req.body.object_attributes.work_in_progress) return res.sendStatus(200)
  axios(axiosConstructor(formatMessage(req.get('X-Gitlab-Event'), req.body)))
    .then(r => {
      return res.sendStatus(200)
    })
    .catch(e => {
      console.log(e);
      return res.send('Something went really bad!');
    });
})

r.post('/test-push', (req, res, next) => {
  const  object_kind = pushEvent.object_kind || '';

  axios(axiosConstructor(formatMessage(object_kind, pushEvent)))
    .then(r => {
      console.log(r);
      return res.sendStatus(200)
    })
    .catch(e => {
      console.log(e);
      return res.send('Something went really bad!');
    });
});

r.post('/test-merge-request', (req, res, next) => {
  const object_kind = mergeRequestEvent.object_kind || '';

  axios(axiosConstructor(formatMessage(object_kind, mergeRequestEvent)))
    .then(r => {
      console.log(r);
      return res.send('Testing...');
    })
    .catch(e => {
      console.log(e);
      return res.send('Something went really bad!');
    });
});

r.post('/test-note', (req, res, next) => {
  const object_kind = noteEvent.object_kind || '';

  axios(axiosConstructor(formatMessage(object_kind, noteEvent)))
    .then(r => {
      console.log(r);
      return res.send('Testing...');
    })
    .catch(e => {
      console.log(e);
      return res.send('Something went really bad!');
    })
});

module.exports = r;
