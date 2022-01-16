const express = require('express');
const router = express.Router();




router.get("/", function (req, res) {
	console.log(router);
	res.send("gellary page")
})

router.post("/", function (req, res) {
	res.send("post in gellary page")
})


module.exports = router;