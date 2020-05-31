const express = require('express');
const app = express();
const port = 3003;

app.get("/", function (req, res) {
	res.send("Home page")
})
app.get("/:a-:b", function(req, res){
	const result = parseInt(req.params.a) + parseInt(req.params.b)
	res.send(200, result);
})

app.listen(port, function () {
	console.log('Example app listening on port 3003!');
});