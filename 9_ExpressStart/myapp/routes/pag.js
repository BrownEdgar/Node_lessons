var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
	console.log('pag start');

	res.render('test', 
	{
		title: 'Express',
		classname1:"box",
		bool:true }
	);
});

module.exports = router;