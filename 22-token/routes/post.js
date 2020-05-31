const express = require('express');
const router = express.Router();
const verify = require('./token');

router.get('/', verify, async(req, res)=> {
	res.send(req.user);
});

module.exports = router;