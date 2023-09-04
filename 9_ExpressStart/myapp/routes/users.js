var express = require('express');
var router = express.Router();

const users = []

/* GET users listing. */
router.get('/', async function(req, res, next) {
	fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(json => {
			users.push(...json)
			res.json(users)
		})
  
});

module.exports = router;
