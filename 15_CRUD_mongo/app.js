const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv/config");

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

//IMport Routes
var notesRouter = require('./routes/posts');
const authRoute = require("./routes/auth");
routerLogValidation = require('./routes/login');


app.use('/posts', notesRouter);
app.use('/user', authRoute);
app.use('/login',routerLogValidation);






mongoose.connect("mongodb://localhost:27017/Notesdb",
	{ useUnifiedTopology: true,
		useNewUrlParser: true 
},
	(err)=> console.log(err));



app.get('/', function (req, res) {
	res.send("Home Page...");
});







app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});