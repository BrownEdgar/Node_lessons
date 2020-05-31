var http = require("http");
var Cookies = require("cookies");

http.createServer(function(req,res){
	let cookies = new Cookies(req,res);
	if (req.url == '/favicon.ico') {
		res.end();
		return;
	}
	cookies.set('admin', 'arjeq');
	console.log(cookies.get('admin'));//վերադարձնում է 'admin'-ի առժեքը այսինքն 'arjeq'
	res.end();
}).listen(5040, ()=>console.log("Server is running on 5040"));