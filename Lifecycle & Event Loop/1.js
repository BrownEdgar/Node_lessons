console.log("before");

setTimeout(function myF(){
	console.log("setTimeout text");
},5000);



/*
setTimeout(function myF(){
	console.log("setTimeout text 1");
},1000);
setTimeout(function myF(){
	console.log("setTimeout text 2");
},1000);
setTimeout(function myF(){
	console.log("setTimeout text 3");
},1000);
setTimeout(function myF(){
	console.log("setTimeout text 4");
},1000);*/

console.log("after");

/*const http = require('http')
const hostname = '127.0.0.1'
const port = 3000
const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World\n')
})
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})*/