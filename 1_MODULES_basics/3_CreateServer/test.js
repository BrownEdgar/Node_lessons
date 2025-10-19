const fs = require('fs');
const http = require('http');

http
  .createServer((req, res) => {
    // home page
    if (req.url == '/') {
      fs.readFile('./index.html', 'utf-8', (err, data) => {
        res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
        res.write(data);
        return res.end();
      });
    }
    if (req.url === '/users') {
      fs.promises.readFile('./data.json').then((data) => {
        res.writeHead(200, { 'Content-type': 'application/json; charset=utf-8' });
        res.write(data);
        res.end();
      });
    }
  })
  .listen(5000, () => console.log('server is running'));

// const server = http.createServer(function (req, res) {
// 	fs.readFile('index.html', function (err, data) {
// 		res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
// 		res.write(data);
// 		return res.end()
// 	})
// 	// res.end(`<h1>Lorem ipsum dolor sit amet.</h1>`)
// })

// server.listen(3333, () => console.log("server run!"))
