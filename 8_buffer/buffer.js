const fs = require('fs'); 
const http = require('http');
 
/*aranc "utf8"-i buffer tver ktpi*/
// let buffer = fs.createReadStream(__dirname + "/text.txt");

// buffer.on("data", function(mas){
// 	console.log("masnik");
// 	console.log(mas);
// });



let buffer = fs.createReadStream(__dirname + "/text.txt","utf8");
let buffer2 = fs.createWriteStream(__dirname + "/writeME.txt");

buffer.on("data", function(mas){
	console.log("masnik");
	buffer2.write(mas);
});
