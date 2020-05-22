var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(req.url);/* ete url-um grenq  http://localhost:8070/Sebo body-um ktpi /Sebo, poxenq inqn el kpoxi*/
  res.end();
}).listen(8070);