var fs = require('fs');

//Ստեղծում է նոր ֆայլ mynewfile1.txt անունով:
fs.appendFile('ds/mynewfile1.txt', 'Hello content!',  (err) =>{
  if (err) throw err;
  console.log('Saved!');
});
