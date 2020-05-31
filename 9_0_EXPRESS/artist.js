var express = require('express');
var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const artists = [{
		id: 1,
		name: "Metalica"
	},
	{
		id: 2,
		name: "Scorpion"
	},

	{
		id: 3,
		name: "Forenger"
	},
	{
		id: 4,
		name: "Forenger"
	},
	{
		id: 5,
		name: "Forenger"
	},
]


app.get("/", function (req, res) {
	res.send("hello Api")
});
app.get("/artists", function(req, res) {
	res.json(artists)

});
app.get("/artists/:id", function (req, res) {
	console.log(req.params);

	let artist = artists.find(artist => {
		return artist.id === Number(req.params.id);
	})

	res.send(artist);
});

//simple add
app.post("/artists", function (req, res) {
	console.log(req.body);
	artists.push(req.body)
	console.log(artists);
	res.end('succsess')
});

//simple update
app.put("/artists/:id", function (req, res) {
	console.log('req.body', req.body)
	const artist = artists.find(elem =>{
		return elem.id === Number(req.params.id)
	})
	artist.name =  req.body.name;
	res.send(artist)//kam status
});

app.delete("/artists/:id", function (req, res) {
	

});
app.listen(3000);
/*Если запрос адресован корневому каталогу приложения, приложение выводит на экран системное время запроса в браузере.*/