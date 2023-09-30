var fs = require('fs');
var path = require('path');

//fs.mkdir մեթոդը ստեղծում է թղթապանակ նշված անունով
fs.mkdir(path.join(__dirname, "newFolder"), function(e){
	if (e && e.code === "EEXIST") {  
	console.log(e);
	}else{
		console.log("Folder is create");
	}
});