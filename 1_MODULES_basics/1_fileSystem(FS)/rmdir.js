var fs = require('fs');

//fs.rmdir մեթոդը ջնջում է թղթապանակը եթե այն  դատարկ է!
fs.rmdir("lesson", function(e){
	if (e) {
		console.log("թղթապանակը դատարկ չէ");
	}else{
		console.log("delete");
	}
});