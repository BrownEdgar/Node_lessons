var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('pages/index', {
		title: 'Ejs Title',
		skills: ['html', 'css', 'Java Script', 'React.js', 'Node.js', 'Python'],
		bool:false,
	})
});

module.exports = router;


