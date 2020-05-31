var express = require('express');
var app = express();




app.get('/', function(req, res, next) {
  console.log(req.headers['cookie']);
  res.sendFile(__dirname + '/index.html')
});



app.listen(5030, ()=>console.log("Server is running on 5030"));