const express = require('express');
const app = express();
const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'first-db',
	port: 3306,
});

connection.connect((err) => {
	if (err) throw err;
	 console.log("Mysql connect!")
})
app.get('/createtable', function (req, res) {
	const sql = "CREATE TABLE users(id int AUTO_INCREMENT, name VARCHAR(255), surname VARCHAR(255), PRIMARY KEY(id))";
	connection.query(sql, (err,result) => {
		if (err) {
			res.json(err)	
		}else{
			res.send("user table is created!")
		}
	})
})

app.get('/adduser', function (req, res) {
	const user = {
		name: "Davit",
		surname: "Gabrielyan"
	}
	const sql = 'INSERT INTO users SET ?'
	connection.query(sql, user, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send("The first user is added in db!")
	})
})

app.listen(3000, () =>  console.log("app server is running"))

function foo(a,b) {
	
}