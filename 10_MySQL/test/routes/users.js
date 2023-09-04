var express = require('express');
var mysql = require('mysql');
var router = express.Router();


const db = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	database: 'node2023',
	port: 3306
})
db.connect((err) => {
	if (err) {
		console.log(err)
	} else {
		console.log("mysql db connected!")
	}
})



router.get('/createTable', function (req, res, next) {
	const sql = `CREATE TABLE users(id int AUTO_INCREMENT, name VARCHAR(255), surname VARCHAR(255), PRIMARY KEY(id))`;
	db.query(sql, (err, results) => {
		if (err) {
			console.log(err);
			throw err;
		} else {
			console.log(results);
			res.json({
				message: 'users TABLE is CREATED!'
			})
		}
	})
});


router.post('/adduser', function (req, res, next) {
	const { body } = req;
	console.log(body);
	const sql = "INSERT INTO users SET ?";
	db.query(sql, body, (err, result) => {
		if (err) {
			return res.json(err)
		} else {
			console.log(result)
			res.json({
				message: "user Added"
			})
		}
	})
})

router.get('/users', function (req, res, next) {
	const sql = "SELECT * FROM users";
	db.query(sql, (err,result) => {
		res.json({
			users:result
		})
	})
})

router.get('/users/:userId', function (req, res, next) {
	const { userId } = req.params;
	const sql = `SELECT * FROM users WHERE id = ${userId}`;
	db.query(sql, (err, result) => {
		if (err) {
			console.log("err:", err)
			return res.json({
				err
			})
		}
		res.json({
			message: result.length ? result : "users not found"
		})
	})

})
router.put('/users/:userId', function (req, res, next) {
	const { userId } = req.params;
	const { name, surname } = req.body;

	const sql = `INSERT INTO users (name, surname) VALUES ('${name}', '${surname}')`;
	db.query(sql, (err, result) => {
		if (err) {
			return res.json({
				err
			})
		}
		res.json({
			message: result
		})
	})
})
module.exports = router;
