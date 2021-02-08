const express = require('express');
const path = require('path');
const app = express();
const port = 3003;

app.get("/", function (req, res) {
	res.send("Home page")
})
app.get("/:a-:b", function(req, res){
	const result = parseInt(req.params.a) + parseInt(req.params.b)
	res.send(200, result);
})
app.get("/aaa", function (req, res) {
	res.sendFile(path.resolve(__dirname, "public", "index.html"));
	
})
app.get("/download", function (req, res) {
	res.download(path.resolve(__dirname, "public", "index.html"));

})
app.listen(port, function () {
	console.log('Example app listening on port 3003!');
});