var express = require('express');
var app = express();
var expbs = require('express-handlebars');

app.engine("handlebars", expbs());
app.set("view engine", "handlebars");

const obj= [
	{id:1, name: "a",age:18,regeon:"usa"},
	{id:2, name: "a",age:32,regeon:"Russia"},
	{id:3, name: "a",age:22,regeon:"usa"},
	{id:4, name: "a",age:18,regeon:"Armenia"},
	{id:5, name: "a",age:64,regeon:"Russia"},
	{ id: 6, name: "a", age: 23, regeon:"Armenia"},
	{ id: 7, name: "a", age: 16, regeon:"Russia"},
	{id:8, name: "a",age:10,regeon:"Denmark"},
	{ id: 9, name: "a", age: 25, regeon:"Armenia"},
]

app.get('/', (req, res) => {
	res.render('home', {
		title:'Home Page',
		name:"home",
		bool:false

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

app.get('/task', (req, res) => {

	let r = obj.filter((elem) => elem.age >= 18)
		.filter((elem) => {
			if (elem.regeon === "usa"){
				if ( elem.age >= 21) {
					return true;
				}
				return false;
			}
			return true;
		})
		console.log(r);
	res.render('task', {
		data: r

	});
});
app.listen(8080, function () {
  console.log('Example app listening on port 8080');
});