var express = require('express');
var app = express();
var expbs = require('express-handlebars');

app.engine("handlebars", expbs());
app.set("view engine", "handlebars");



app.get('/', (req, res) => {
	res.render('home', {
		title:'Home Page',
		name:"home",
		bool:true

		});
});


app.get('/about', (req, res) => {
	res.render('about',{
		title:'About Page',
		 name:"About",
		 age: 30,
		 description:" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad sint vero natus soluta fugit, vitae veniam incidunt."
		});
});

app.get('/dashboard', (req, res) => {
	res.render('dashboard',{
		isnameValid:false

		});
});
app.get('/contact', (req, res) => {
	
	res.render('contact',{
		people:[
		"Vardan",
		"Anahit",
		"Levon",
		"Hrach"
		],
		user:{
			userName:"Sebastian",
			age: 25,
			phone:77658987
		},
		lists:[
		{
			items:["anun","Azganun","Email"]
		},
		{
			items:["anun2","Azganun2","Email2"]
		},
		]

		});
});



app.listen(8080, function () {
  console.log('Example app listening on port 8080');
});