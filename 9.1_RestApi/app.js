// var express = require('express');
// const bodyParser = require("body-parser");
// const app = express();
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

// app.use(express.json());

// let products= [
// 	{
// 		id:1,
// 		name:"phpne",
// 		price: 480
// 	},
// 	{
// 		id:2,
// 		name:"tablet",
// 		price: 700
// 	},
// 	{
// 		id:3,
// 		name:"MacPro",
// 		price: 2800
// 	}
// ]
// app.get('/products', function(req, res){
// 	res.json(products)
// })
// app.post('/products', function(req, res){
// 	products.push(req.body);
// 	res.json(req.body);
// })
app.put('/products/:id', function(req, res){
	const product = products.find(p => p.id === +req.params.id);
	const productIndex = products.indexOf(product);
	const newProduct = { ...product, ...req.body };
	products[productIndex] = newProduct;
	res.json(newProduct);
});

// app.delete('/products/:id', function(req, res){
// 	const product = products.find(p => p.id === +req.params.id);
// 	const productIndex = products.indexOf(product);
// 	products.splice(productIndex, 1);
// 	res.json({success:true});
// });

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });

var express = require('express');
var app = express();

var users = require('./routes/users');
var about = require('./routes/about');

app.use('/users', users);
app.use('/about', about);
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});