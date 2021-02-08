const fs = require('fs');

const readStream = fs.createReadStream('./demofile.txt');

/* Երբ տեղի ունենա readStream իրադարձությունը console-ում կտպի 'The file is open'*/
readStream.on('open', function () {
	console.log('The file is open');
});
