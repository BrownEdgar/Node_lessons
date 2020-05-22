const fs = require('fs'); 
const http = require('http'); 
let port = 8083;

const server = http.createServer((req, res) => { 
	console.log("noric mtav");
	res.writeHead(200, {"Content-Type": "text/html"});
	let buffer = fs.createReadStream(__dirname + "/index.html","utf8");	
	res.write("avelacum");	
	buffer.pipe(res);

});
server.listen(port, () => {
console.log('Server listening on: http://localhost:%s', port);
});