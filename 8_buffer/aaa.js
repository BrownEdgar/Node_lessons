const fs = require("fs");


const obj ={}

fs.unlink('info.txt', function (err) {
	if (err && err.code === "ENOENT") {
		console.log("chka tenc fayl");
	} else {
		console.log('File deleted!');
	}
});
