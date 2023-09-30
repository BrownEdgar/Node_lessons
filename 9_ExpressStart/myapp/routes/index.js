var express = require('express');
var {Errors, ErrorMessages} = require('../errors/ErrorMessages');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
	Errors.notfound(res, ErrorMessages.NOT_FOUND.replace(":id", 65321))

		
});

module.exports = router;
