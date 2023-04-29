// const fs = require('fs');

// const data = fs.readFileSync('test.txt'); // blocks here until file is read
// console.log(data.toString());

// function moreWork(){
// 	console.log("moreWork");
// }
// moreWork(); // կաշխատի ՝console.log՝-ից հետո


// console.log("-------------------------------------------");

// fs.readFile('test.txt', (err, data) => {
//   if (err) throw err;
//   console.log(data.toString());
// });

// function moreWork(){
// 	console.log("moreWork");
// }
// moreWork(); //կաշխատի ՝console.log՝-ից առաջ

const path = require("path")
const fs = require("fs")




// fs.appendFile("newName2.txt", " new content", (err) => {
// 	if (err) {
// 		 console.log(err)
// 	}else{
// 		 console.log("renamed!")
// 	}
// })

// fs.rename("newName2.txt", "change.txt", (err) => {
// 	if (err) {
// 		console.log(err)
// 	} else {
// 		console.log("renamed!")
// 	}
// })


// fs.unlink('change.txt', (err) => {
// 	if (err?.code) {
// 		 console.log("not found for delete!")
// 	}else{
// 		 console.log("file Deleted!")
// 	}
// })


// fs.mkdir(path.join(__dirname, "myFolder"), (err) => {
// 	if (err?.code) {
// 		 console.log(err)
// 	}else{
// 		console.log("folder created end ...")
// 		fs.appendFile(path.join(__dirname, "myFolder/first.txt",), "first text in txt", (err) => {
// 			if (err?.code) {
// 				console.log(err)
// 			} else {
// 				 console.log("and file is Here!")
// 			}
// 		})
// 	}

// })


// fs.readdir("./myFolder", (err, files) => {
// 	console.log(files);
// 	files.forEach(file => {
// 		console.log(file)
// 		if (file.startsWith("first")) {
// 			fs.unlink(`./myFolder/${file}`, (err) => {
// 				if (err) {
// 					console.log(err)
// 				} else {
// 					console.log("deleted")
// 				}
// 			})
// 		} else {
// 			fs.rename(`./myFolder/${file}`, "404.txt", (err) => { console.log("renamed!") })
// 		}
// 	})
// })


// fs.rmdir("myFolder", function (e) {
// 	if (e) {
// 		console.log("թղթապանակը դատարկ չէ");
// 	} else {
// 		console.log("delete");
// 	}
// });

// fs.appendFile("myFile.txt", "asddsdsadasa", (err) => {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log('created!');
// 	}
// })

fs.open("myFile.txt", "wx",  (err, fd) => {
	if (err) {
		console.log(err);
 	} else {
		console.log(fd);
 	}
})