var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('process', process)
	console.log('process', process.env.PORT)
  res.render('index', { title: 'Express' });
});

module.exports = router;
