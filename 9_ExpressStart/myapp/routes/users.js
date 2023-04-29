var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
	fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(json => res.json(json))
  
});

module.exports = router;
