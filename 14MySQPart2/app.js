var express = require('express');
var app = express();
var mysql = require('mysql');

const con = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '',
  	port:3307,
	database:'mydb2'//ete sax normal ancni http://localhost/phpmyadmin ksarqi baza ajs anunov

});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
    var sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255), address VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
     console.log("Table created");
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

/*
host: хост, на котором запущен сервер mysql. По умолчанию имеет значение "localhost"
port: номер порта, на котором запущен сервер mysql. По умолчанию имеет значение "3306"
user: пользователь MySQL, который используется для подключения
password: пароль для пользователя MySQL
database: имя базы данных, к которой идет подключение. Необязательный параметр. Если он не указан, то подключение идт в целом к северу
charset: кодировка для подключения, например, по умолчанию используется "UTF8_GENERAL_CI".
timezone: часовой пояс сервера MySQL. This is used to type cast server date/time values to JavaScript. По умолчанию имеет значение "local"*/