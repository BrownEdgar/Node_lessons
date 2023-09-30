const fs = require('fs');
const path = require('path');


// fs.writeFile(path.join(__dirname, './test.txt'), "ssssssssssss", (err) => {
// 	if (err) {
// 		 console.log(err);
// 	}else{
// 		 console.log("saved!")
// 	}
// })

// fs.readFile(path.join(__dirname, './data.json'), (err, data) => {
// 	if (err) {
// 		 console.log(err)
// 	}else{
// 		const o = JSON.parse(data, function (key,value) {
// 			if (key && key === 'date' || value instanceof Date) {
// 				return new Date(value)
// 			}
// 			return value;
// 		})
// 		 console.log(o)
// 	}
// })


fs.mkdirSync(path.join(__dirname, "add"), (err) => {

	if (err) {
		console.log('something is wrong maybe foolder is alredy exist')
	}
})
console.log('folder is created')



