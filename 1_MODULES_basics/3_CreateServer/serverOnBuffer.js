const fs = require('fs');
const http = require('http');
// let port = 8083;

// const server = http.createServer(function(req,res){
// 	res.writeHead(200, { "Content-Type": "text/html" });
// 	let buffer = fs.createReadStream(__dirname, "./index.html", "utf8");
// 	res.write("<h1>HEllo node</h1>")
// })
// server.listen(port, ()=> console.log("server is running"))

const port = 8083;

const server = http.createServer((req, res) => {
  console.log('noric mtav');
  res.writeHead(200, { 'Content-Type': 'text/html' });
  const buffer = fs.createReadStream(`${__dirname}/index.html`, 'utf8');

  buffer.pipe(res);
});
server.listen(port, () => {
  console.log('Server listening on: http://localhost:%s', port);
});
