var fs = require('fs');

//Ստեղծում/ավելացնում է ֆայլի վերջից է նոր ֆայլ mynewfile1.txt անունով:
fs.appendFile('RenameFile.txt', '  Hello content!',  (err) =>{
  if (err) throw err;
  console.log('Saved!');
});
