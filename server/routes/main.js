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
  console.log(formattedMessage, 'Message')
  return {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    url: 'https://hooks.slack.com/services/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',
    data: formattedMessage
  }
}

r.get('/', (req, res, next) => {
  console.log(req);
  return res.send('Welcome to Rotom, More than a Bot, a BOT!');
});

r.post('/', (req, res, next) => {
  console.log(req.body);
  return res.send('Got a POST');
});

r.get('/test', (req, res, next) => {
  axios(
    {

    }
  ).then(r => {
    console.log(r);
    return res.send('Testing...');
  })
    .catch(e => {
      console.log(e);
      return res.send('Something went really bad!');
    });
});

r.post('/test-push', (req, res, next) => {
  const { object_kind = '' } = pushEvent;

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
  const { object_kind = '' } = noteEvent;

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
