const express = require('express');
const app = express();
const expbs = require('express-handlebars');
const path = require('path');
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", expbs());
app.set("view engine", "handlebars");

//որպեսզի handlebars-ում կարողանանք օգտագրոծել "css" ֆայլը
app.use(express.static(path.join(__dirname, '/public')));


app.get('/', (req, res) => {
	res.render('home', {});
	
});
app.post('/contact', (req, res) => {
	let isValid = true;
	let message = '';
	const { email, password } = req.body;
	if (!email || !password) {
		isValid = false;
		message = `Please fill alll fields`
		res.render('home', {isValid,message });
		return;
	}
	 isValid = /^(?=.*\d)(?=.*[a-zA-Z]).{4,15}$/.test(password);
	if (!isValid) {
		message = 'incorect password'
	}else{
		message = 'good :)'
	}
console.log( {email, password})
	res.render('home', {isValid,message });
	
});

app.listen(8080, function () {
	console.log('Example app listening on port 8080');
});