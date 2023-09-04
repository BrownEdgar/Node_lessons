const http = require('http');
const fs = require('fs');


const server = http.createServer(function (req, res) {
	fs.readFile('index.html', function (err, data) {
		res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
		res.write(data);
		return res.end()
	})
	// res.end(`<h1>Lorem ipsum dolor sit amet.</h1>`)
})


server.listen(3333, () => console.log("server run!"))