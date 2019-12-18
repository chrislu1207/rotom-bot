'use strict';
const express = require('express');
const axios = require('axios');
const checkToken = require('../../middlewares').checkToken;

const r = express.Router();

const formatMessage = require('../utils/formatMessage');
const pushEvent = require('../test/push');
const mergeRequestEvent = require('../test/merge-request');
const noteEvent = require('../test/note');

r.get('/', (req, res, next) => {
  console.log(req);
  return res.send('Welcome to Rotom, More than a Bot, a BOT!');
});

r.post('/', (req, res, next) => {
  console.log(req.body);
  return res.send('Got a POST');
});

r.get('/test', (req, res, next) => {
  axios
    .post(
      'https://hooks.slack.com/services/' + process.env.TOKEN ||
        require('config').get('slack.token'),
      {
        text: 'YO YO!!',
      },
    )
    .then(r => {
      console.log(r);
      return res.send('Testing...');
    })
    .catch(e => {
      console.log(e);
      return res.send('Something went really bad!');
    });
});

r.get('/test-push', (req, res, next) => {
  const { object_kind = '' } = pushEvent;

  axios
    .post(
      `https://hooks.slack.com/services/${config.get('slack.token')}`,
      formatMessage(object_kind, pushEvent),
    )
    .then(r => {
      console.log(r);
      return res.send('Testing...');
    })
    .catch(e => {
      console.log(e);
      return res.send('Something went really bad!');
    });
});

r.get('/test-merge-request', (req, res, next) => {
  const { object_kind = '' } = mergeRequestEvent;

  axios
    .post(
      `https://hooks.slack.com/services/${config.get('slack.token')}`,
      formatMessage(object_kind, mergeRequestEvent),
    )
    .then(r => {
      console.log(r);
      return res.send('Testing...');
    })
    .catch(e => {
      console.log(e);
      return res.send('Something went really bad!');
    });
});

r.get('/test-note', (req, res, next) => {
  const { object_kind = '' } = noteEvent;

  axios
    .post(
      `https://hooks.slack.com/services/${config.get('slack.token')}`,
      formatMessage(object_kind, noteEvent),
    )
    .then(r => {
      console.log(r);
      return res.send('Testing...');
    })
    .catch(e => {
      console.log(e);
      return res.send('Something went really bad!');
    });
});

module.exports = r;
