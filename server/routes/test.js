'use strict';
const express = require('express')
const axios = require('axios')

const { axiosConstructor } = require('../../middlewares')
const formatMessage = require('../utils/formatMessage');
const pushEvent = require('../test/push');
const mergeRequestEvent = require('../test/merge-request');
const noteEvent = require('../test/note');

const r = express.Router()


r.post('/push', (req, res, next) => {
  const  object_kind = pushEvent.object_kind || '';

  axios(axiosConstructor(formatMessage(object_kind, pushEvent)))
    .then(r => {
      return res.sendStatus(200)
    })
    .catch(e => {
      console.log(e);
      return res.send('Something went really bad!');
    });
});

r.post('/merge-request', (req, res, next) => {
  const object_kind = mergeRequestEvent.object_kind || '';

  axios(axiosConstructor(formatMessage(object_kind, mergeRequestEvent)))
    .then(r => {
      return res.sendStatus(200);
    })
    .catch(e => {
      console.log(e);
      return res.send('Something went really bad!');
    });
});

r.post('/note', (req, res, next) => {
  const object_kind = noteEvent.object_kind || '';

  axios(axiosConstructor(formatMessage(object_kind, noteEvent)))
    .then(r => {
      return res.sendStatus(200);
    })
    .catch(e => {
      console.log(e);
      return res.send('Something went really bad!');
    })
});

module.exports = r;
