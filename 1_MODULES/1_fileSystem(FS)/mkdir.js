var fs = require('fs');

//fs.mkdir մեթոդը ստեղծում է թղթապանակ նշված անունով
fs.mkdir("test4/rrr/lll", function(e){
	if (e && e.code === "EEXIST") {  
	console.log(e);
	}else{
		console.log("Folder is create");
	}
});