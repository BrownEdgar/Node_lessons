var express = require('express');
var mysql = require('mysql');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

const db = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	port: 3306,
	password: "xxx",
	database: 'nodemysql' //ete sax normal ancni http://localhost/phpmyadmin ksarqi baza ajs anunov
});

db.connect((err) => {
	if (err) {
		throw err;
	} else {
		console.log("MySql Connected...");
	}
})



app.get('/', function (req, res) {
	res.send("Home Page...");
});

app.get('/createdb', function (req, res) {//13-rd toxy piti chlni vor stexci db
	let sql = 'CREATE DATABASE nodemysql23';
	db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send("Database created...");
	});
});

//create table
app.get('/createtable', function (req, res) {
	let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
	db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send("Post table created...");

	});
});

//add post 1
app.get('/addpost1', (req, res) => {//phpMyadmin - Обзор 
	let post = {
		title: "Post one",
		body: "im arajin posty MySQL-um"
	};
	let sql = 'INSERT INTO posts SET ?';
	let query = db.query(sql, post, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send("Post 1 avelacvac e...")
	});
});
//add post 2
app.get('/addpost2', (req, res) => {//phpMyadmin - Обзор 
	let post = {
		title: "Post two",
		body: "im erkrord posty MySQL-um"
	};
	let sql = 'INSERT INTO posts SET ?';
	let query = db.query(sql, post, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send("Post 2 avelacvac e...")
	});
});
//tpel postery
app.get('/getposts', (req, res) => {
	let sql = 'SELECT * FROM posts';
	let query = db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send(result);
	});
});

//ymntrel
// app.get('/specialPost/:id', (req, res) => {
// 	let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
// 	let query = db.query(sql, (err, result) => {
// 		if (err) throw err;
// 		console.log(result);
// 		res.send(result)
// 	});
// });

//update post
app.get('/specialPost/:id', (req, res) => {
	let newTitle = "Popoxvac text";
	let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
	let query = db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);

		res.send("Post Updated!!!");
	});
});

//delete post
app.get('/deletepost/:id', (req, res) => {
	let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
	let query = db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send("Post deleted!!!");
	});
});


app.post("/post", (req, res) => {
	console.log("req.body", req.body)
	res.send(req.body.name)
});


app.listen(3030, function () {
	console.log('Example app listening on port 3030!');
});
