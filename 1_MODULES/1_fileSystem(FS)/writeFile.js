var fs = require('fs');

//fs.writeFile մեթոդը փոխում է  ֆայլի պարունակությունը, եթե այն գոյություն ունի,
//հակառակ դեպքում ստղծվում է նոր ֆայլ նշված բաղադրությամբ:

fs.writeFileSync('mynewfile3.txt', 'Hello content!', function (err) {
  if (err) throw err;
  console.log('Saved!');
});
// Փոխում է ֆայլի պարունակությունը
fs.writeFileSync('mynewfile3.txt', 'This is my text', function (err) {
  if (err) throw err;
  console.log('Replaced!');
});

fs.rename("mynewfile3.txt", "RenameFile.txt", function(err){
  // if (err.code == "ENOENT") {
  //    console.log("Edpisi fayl chka");
  // }
   console.log('File Renamed!');
});