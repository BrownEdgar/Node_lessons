const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");


dotenv.config();


//connect DB

mongoose.connect("mongodb://localhost:27017/User",
	{ useUnifiedTopology: true,
	useNewUrlParser: true },
	(err)=> console.log(err));

app.use(express.json());

const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});