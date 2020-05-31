const express = require('express')
const app = express();
const path = require('path');


const port = 3000;

/*app.set("view engine", 'ejs');*/


app.set("views", path.join(__dirname, 'views'));
app.set("view engine", 'pug');

app.get('/home', (req, res) => {
	console.log("home");
	});

/*app.get('/:name', (req, res) => {
	let data = {
		age:32,
		job:"developer"
	}
	res.render('index',{person:req.params.name,data:data});
});
*/
app.get('/', (req, res) => {
	res.render('index',{
		title:"hello World"
	});
	});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));