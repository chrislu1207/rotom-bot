const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const main = require('./server/routes/main');
const slack = require('./server/routes/slack');
const test = require('./server/routes/test')
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res, next) => {
  return res.send('Welcome to Rotom, More than a Bot, a BOT!');
});

app.post('/', (req, res, next) => {
  return res.send('Welcome to Rotom, More than a Bot, a BOT!');
});

app.use('/gitlab', main);
app.use('/slack', slack);
app.use('/test', test);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  console.log('ERROR SOON!!!');
  res.send('Got an ERROR: ' + err);
});

module.exports = app;
