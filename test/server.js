const http = require('http');
const fs = require('fs');

const server = http.createServer(function(req,res){
    res.writeHead(200, {'Content-type': "text/plain; charset=Utf8"})
    let buffer = fs.createReadStream(__dirname + '/test.txt');
    buffer.pipe(res)
})
server.listen(3000, ()=> console.log("server is running"))
