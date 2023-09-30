// ## import fs from 'fs';  
 // այս դեպքում ամեն անգամ պիտի գրենք  `fs.promises` դրա համար կարող ենք գրել այլ կերպ 

const fs = require('fs/promises');

fs.readFile('readme.txt', 'utf8').then(data => {
	console.log(data);
}).catch(err => {
	console.log('ошибка');
});