let fs = require('fs');

/* Read txt file!! */
// fs.readFile("test.txt", function(err, data){
// 	if (err) {
// 		throw err;
// 	}
// 	console.log(data.toString());
// });

/*read  json! file*/
fs.readFile("test.json", function (err, data) {
	if (err) {
		throw err;
	}
	let arr = data.toString();
	arr = JSON.parse(arr);
	console.log(arr.age);
});

/*Read HTML file!!*/
// fs.readFile('./demoFile1.html', function (req, data) {

// 	res.write(data);
// 	return res.end();
// });
