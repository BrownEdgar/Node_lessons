var express = require('express');
var axios = require('axios');
var User = require('../models/User');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
	let x = axios.get('https://jsonplaceholder.typicode.com/users/1')
		.then(async (response) =>{
			let newUser = new User({
				name: response.data.user.name,
				username: response.data.user.username,
				email: response.data.user.email
			})
			let r = await newUser.save();
			res.json({
				user: response.data
			})
		})
		.catch(err => console.log(err))
		
	
});

module.exports = router;
