var fs = require('fs');

//fs.open մեթոդը ստեղծում է նոր դատարկ ֆայլ mynewfile2.txt անունով:
//'w' - for "writing",
fs.open('levon/mynewfile2.txt', 'w', function (err, file) {
  if (err) throw err;
  console.log('Saved!');
});