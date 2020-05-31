const express = require('express');
const app = express();
const port = 3000;


app.get('/', (req, res) => {
	res.send("sebo");
});


// app.use(function (req, res){
// 	res.type("text/plain")
// 	res.status(404)
// 	res.send("404 Page not found")
// });

/*kam */
app.use(function (req, res,next){
	const error = new Error("not Found");
	error.status = 404;
	next(error);
});
app.use(function (error, req, res,next){
	res.status(error.status || 500);
	res.json({
		error:{
			status:error.status,
			message:error.message
		}
	});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));