var express = require('express');
var app = express();




app.use('/', function(req, res, next) {
  console.log("Cookies:", req.headers['cookie']);
 	/*Ուղարկում է միայն 1 cookie*/
	/*res.setHeader('Set-cookie', "Test1=test2");*/

	/*Ուղարկում է շատ cookie-ր*/
	res.setHeader('Set-cookie', ["item2=value2","item3=value3","email=example@mial.com"]);

	console.log("Method getCookie():",res.getHeader('Set-cookie'));
	res.sendFile(__dirname + '/index.html')
});



app.listen(5030, ()=>console.log("Server is running on 5030"));