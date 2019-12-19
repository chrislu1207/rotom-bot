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
    url: 'https://hooks.slack.com/services/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',
    data: formattedMessage
  }
}

r.post('/', (req, res, next) => {
  // TODO 
  // check body reuqs
  // pass down bix
  console.log(req.body)
  formatMessage(req.get('X-Gitlab-Event'), req.body)
  return res.sendStatus(200)
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
  const { object_kind = '' } = mergeRequestEvent;

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
