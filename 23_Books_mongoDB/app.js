const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
dotenv.config();


//connect DB
mongoose.connect(process.env.DB_CONNECTION,
	{
  useUnifiedTopology: true,
	useNewUrlParser: true 
},
	()=> console.log("Connected to db!"));

app.use(express.json());


const bookRoute = require("./routes/book");
app.use('/addBooks', bookRoute);

app.get('/', async(req, res)=> {
	res.send("Home Page");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});