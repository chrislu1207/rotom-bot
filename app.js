const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const main = require('./server/routes/main')
const slack = require('./server/routes/slack')
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', main);
app.use('/slack', slack)


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
  res.send(`Got an ERROR: ${err}`);
});

module.exports = app;