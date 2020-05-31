var fs = require('fs');

/*կարդում է նշված ուղին, */
fs.readdir("./test", function(err, files){
	console.log(files);
	
	 files.forEach(file => console.log("name: " + file));
});
