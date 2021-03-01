const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;

// 	import MODELS AND SERVICES
const models = require("./models");
const sevices = require("./services");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


//ROUTES
const wineRouter = require('./routes/Wine');


app.use("/wine", wineRouter);


app.models = {
	wines: models.wine
}
app.services = {
	wines: new (sevices.wine)(app.models),
};


mongoose.connect("mongodb+srv://Edgar:sebastian25@sebocl.bhoqm.mongodb.net/klaus?retryWrites=true&w=majority",
	{
		useUnifiedTopology: true,
		useNewUrlParser: true
	},
	(err) => console.log(err));


app.listen(PORT, function () {
	console.log('Example app listening on port 3000!');
});
