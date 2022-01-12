var express = require('express');
var path = require('path');

const mongoose = require('mongoose');


// 	import MODELS AND SERVICES
const models = require("./models");
const sevices = require("./services");

const app = express();

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/public/css', express.static(__dirname + '/public/css'));

app.use(express.urlencoded({ extended: true }))

//ROUTES

const agregateRouter = require('./routes/agregateTest');

app.use("/agregate", agregateRouter);


app.models = {
	clients: models.userInfo
}
app.services = {
	clients: new (sevices.ClientServices)(app.models),
};





// Use connect method to connect to the server
async function start() {
	try {
		await mongoose.connect(
			'mongodb+srv://Edgar:sebastian25@sebocl.bhoqm.mongodb.net/abcd?retryWrites=true&w=majority',
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

