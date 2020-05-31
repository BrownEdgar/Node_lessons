const fs = require('fs');
const http = require('http');


const server = http.createServer((req, res) => {
	console.log('req.url', req.url)
	if (req.url === '/' ) {
		res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });

		let buffer = fs.createReadStream(__dirname + "/index.html", "utf8");
		buffer.pipe(res);
	} else if (req.url === '/about'){
		res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });

		let buffer = fs.createReadStream(__dirname + "/about.html", "utf8");
		buffer.pipe(res);
	}else{
		res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
		let buffer = fs.createReadStream(__dirname + "/error.html", "utf8");
		buffer.pipe(res);
	}
});


server.listen(3000, () => {
	console.log('Сервер запущен');
});



