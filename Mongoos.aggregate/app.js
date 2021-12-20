var express = require('express');
var path = require('path');
const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');
const expresslayouts = require('express-ejs-layouts')

// 	import MODELS AND SERVICES
const models = require("./models");
const sevices = require("./services");

const app = express();
app.use(expresslayouts);
app.use(express.json());
app.set("layout", './layouts/main');

app.use(express.static(path.join(__dirname, 'public')))
app.use('/public/css', express.static(__dirname + '/public/css'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))

//ROUTES
const homeRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const agregateRouter = require('./routes/agregateTest');

app.use("/", homeRouter);
app.use("/users", usersRouter);
app.use("/agregate", agregateRouter);


app.models = {
	clients: models.clientInfo
}
app.services = {
	clients: new (sevices.ClientServices)(app.models),
};





// Use connect method to connect to the server
async function start() {
	try {
		await mongoose.connect(
			'mongodb+srv://Edgar:sebastian25@sebocl.bhoqm.mongodb.net/klaus?retryWrites=true&w=majority',
			{
				useNewUrlParser: true,
				useFindAndModify: false,
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

