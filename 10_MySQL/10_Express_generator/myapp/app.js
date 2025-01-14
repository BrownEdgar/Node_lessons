var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();
var mysql = require('mysql');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

//MySQL Connect
//more info https://metanit.com/web/nodejs/8.1.php
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  port: 3306,
  database: 'abcd',
});

db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('MySql Connected...');
  }
});
app.get('/', function (req, res) {
  res.send('Home Page...');
});

app.get('/createdb', function (req, res) {
  //11-rd toxy piti chlni vor stexci db
  let sql = 'CREATE DATABASE nodemyysql';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Database created...');
  });
});

//create table
app.get('/createtable', function (req, res) {
  let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post table created...');
  });
});

//add post 1
app.get('/addpost1', (req, res) => {
  //phpMyadmin - Обзор
  let post = {
    title: 'Post one',
    body: 'im arajin posty MySQL-um',
  };
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post 1 avelacvac e...');
  });
});
//add post 2
app.get('/addpost2', (req, res) => {
  //phpMyadmin - Обзор
  let post = {
    title: 'Post two',
    body: 'im erkrord posty MySQL-um',
  };
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post 2 avelacvac e...');
  });
});
//tpel postery
app.get('/getposts', (req, res) => {
  let sql = 'SELECT * FROM posts';
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Postery tpvac en...');
  });
});

//ymntrel
app.get('/specialPost/:id', (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
//update post
app.get('/updatepost/:id', (req, res) => {
  let newTitle = 'Popoxvac text';
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);

    res.send('Post Updated!!!');
  });
});
//delete post
app.get('/deletepost/:id', (req, res) => {
  let newTitle = 'Popoxvac text';
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post deleted!!!');
  });
});

app.post('/post', (req, res) => {
  console.log('req.body', req.body);
  res.send(req.body.name);
});

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
