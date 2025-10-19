const fs = require('fs');
const http = require('http');

http
  .createServer((req, res) => {
    // Open a file on the server and return its content:
    fs.readFile('index.html', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);
