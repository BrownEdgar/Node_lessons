var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/', function(req, res, next) {
  res.cookie('My first cookie', "Good job");
  res.end("ok");
});
app.get('/removeCookie', function(req, res, next) {
  res.clearCookie('My first cookie');
  res.end("ok");
});

app.listen(5010, ()=>console.log("Server is running"));