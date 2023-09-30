
// http.createServer(function (req, res) {
  
//   fs.readFile('demofile1.html', function(err, data) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     res.end();
//   });
// }).listen(8080);




const http = require('http');
const fs = require('fs');


let server = http.createServer(function(req,res){
	if (req.url === "/") {
		
	}
})
server.listen(3541, ()=> console.log(`server is Starting`))