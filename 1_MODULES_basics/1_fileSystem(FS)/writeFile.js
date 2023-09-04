const fs = require('fs');
const path = require("path");

//Ստեղծում է  նոր ֆայլ mynewfile1.txt անունով:
fs.writeFile(path.join(__dirname, "test", "mynewfile1.txt"), "Bond James BOND!", (err) => {
	if (err) throw err;
	console.log('Saved!');
});


//* Եթե "test" թղթապանակ չլինի՝ կհարուցի սխալ;


fs.writeFile('./first.txt', 'First file text')
	.then(() => console.log('File first.txt was written'))
	// .then(() => fs.appendFile('./first.txt', '\nOne more line'))
	// .then(() => console.log('Appended text to the first.txt file'))
	// .then(() => fs.rename('./first.txt', './renamed-first.txt'))
	// .then(() => console.log('File was renamed'))
	.catch((err) => console.log(err));