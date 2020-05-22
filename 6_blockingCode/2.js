const fs = require('fs');
const data = fs.readFileSync('test.txt'); // blocks here until file is read
console.log(data.toString());

function moreWork(){
	console.log("moreWork");
}
moreWork(); // կաշխատի ՝console.log՝-ից հետո


console.log("-------------------------------------------");

fs.readFile('test.txt', (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});

function moreWork(){
	console.log("moreWork");
}
moreWork(); //կաշխատի ՝console.log՝-ից առաջ


