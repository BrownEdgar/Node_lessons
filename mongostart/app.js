const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const expresslayouts = require('express-ejs-layouts')



var app = express();
app.use(expresslayouts);
app.set("layout", './layouts/main');

app.use(express.static(path.join(__dirname, 'public')))
app.use('/public/css', express.static(__dirname + '/public/css'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const homeRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const testRouter = require('./routes/test');
const futbolistRouter = require('./routes/futbolist');
const girqRouter = require('./routes/Griq');
app.use("/", homeRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/test", testRouter);
app.use("/fotbolist", futbolistRouter);
app.use("/girq", girqRouter);

// Use connect method to connect to the server
async function start() {
	try {
		await mongoose.connect(
			'mongodb+srv://Edgar:sebastian25@sebocl.bhoqm.mongodb.net/klaus?retryWrites=true&w=majority',
			{
				useNewUrlParser: true,
				useUnifiedTopology: true 
			}
		)
		app.listen(3333, () => {
			console.log('Server has been started...')
		})
	} catch (e) {
		console.log(e)
	}
}

start()

