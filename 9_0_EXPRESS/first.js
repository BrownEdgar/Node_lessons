const express = require('express')
const app = express();
const path = require('path');


const port = 3000;
console.log(`node.env ${process.env.NODE_ENV}`);
console.log(app.get('env'));
/*app.set("view engine", 'ejs');*/


app.set("views", path.join(__dirname, 'views'));
app.set("view engine", 'pug');

app.get('/home', (req, res) => {
	console.log("home");
});

app.get('/:name', (req, res) => {
	let data = {
		age:32,
		job:"developer"
	}
	const arrayName = [ 98,42,56,87,695,36,25,10,3,9 ];
	res.render('index', { person: req.params.name, data: data, arrayName: arrayName});
});

app.get('/', (req, res) => {
	res.render('index',{
		title:"hello World"
	});
	});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));