const fs = require('fs');
const path = require("path");

//Ստեղծում է  նոր ֆայլ mynewfile1.txt անունով:
fs.writeFile(path.join(__dirname, "test", "mynewfile1.txt"), "Bond James BOND!", (err) => {
	if (err) throw err;
	console.log('Saved!');
});

//* Եթե "test" թղթապանակ չլինի՝ կհարուցի սխալ;