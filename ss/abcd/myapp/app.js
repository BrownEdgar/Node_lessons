require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const expresslayouts = require('express-ejs-layouts');

const app = express();

app.use(expresslayouts);
app.set("layout", './layouts/main');
const models = require("./models");
const sevices = require("./services");

const productRouter = require('./routes/product');
const usersRouter = require('./routes/users');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/css', express.static(__dirname + '/public/css'));

app.use('/', productRouter);
app.use('/users', usersRouter);



app.models = {
  products: models.product
}

app.services = {
  products: new (sevices.product)(app.models),
};
mongoose.connect(process.env.MONGO_DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("server is running!");
    }
  })


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
