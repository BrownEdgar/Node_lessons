const fs = require('fs');
const path = require('path');

/* Read txt file!! */
// .toString() մեթոդի փոխարեն կարող ենք 2-րդ արգումենտով փոխանցել "utf-8" արգումենտը
fs.readFile('test.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data.toString()); // եթե այսպես չգրենք կվերադարձնի Buffer
});

/* read  json! file */
fs.readFile(path.join(__dirname, 'test.json'), (err, data) => {
  if (err) {
    throw err;
  }
  let arr = data.toString(); // string
  arr = JSON.parse(arr); // string => object
  console.log(arr.name);
});

// /*Read HTML file!!*/
// fs.readFile('./demoFile1.html', function (res, data) {

// 	res.write(data);
// 	return res.end();
// });
