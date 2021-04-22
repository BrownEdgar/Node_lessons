let fs = require('fs');
let path = require('path');

/* Read txt file!! */
fs.readFile("test.txt", function(err, data){
	if (err) {
		throw err;
	}
	console.log(data.toString());
});

/*read  json! file*/
fs.readFile(path.join(__dirname, "test.json"), function (err, data) {
	if (err) {
		throw err;
	}
	let arr = data.toString();//string
	arr = JSON.parse(arr); // string => object
	console.log(arr.name);
});

/*Read HTML file!!*/
fs.readFile('./demoFile1.html', function (res, data) {

	res.write(data);
	return res.end();
});
