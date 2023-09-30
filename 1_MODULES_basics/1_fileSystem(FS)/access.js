const fs = require('fs/promises');


// constants.F_OK
fs.access('test.txt', fs.constants.F_OK).then(() => {
	console.log('file exists');
}).catch(() => {
	console.error('file does not exists');
});