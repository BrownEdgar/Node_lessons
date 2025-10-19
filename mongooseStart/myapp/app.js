const path = require('path');

const cookieParser = require('cookie-parser');
const express = require('express');
const createError = require('http-errors');
const mongoose = require('mongoose');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const postRouter = require('./routes/posts');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRouter);
app.use('/posts', postRouter);

// Mongoose connect
mongoose.connect('mongodb://0.0.0.0:27017/klaus').then(() => console.log('Connected!'));

mongoose.connection.on('error', (err) => {
  console.log(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pages/error');
});

module.exports = app;
