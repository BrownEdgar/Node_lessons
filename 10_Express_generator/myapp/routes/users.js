var express = require('express');
const { Errors, ErrorMessages } = require('../errors/ErrorMessages');
var router = express.Router();


router.post('/', function(req, res, next) {
  if (!req.user) {
		Errors.notfound(res, ErrorMessages.NOT_FOUND.replace(":id", 651321))
	}
});

module.exports = router;
