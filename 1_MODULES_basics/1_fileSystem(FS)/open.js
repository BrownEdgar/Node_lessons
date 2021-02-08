const fs = require('fs');

//fs.open մեթոդը ստեղծում է նոր դատարկ ֆայլ mynewfile2.txt անունով:
//'w' - for "writing",
// "r" Բացում է ֆայլը կարդալու համար, "err"-եթե այն գոյություն չունի .
// ԱՎելին => https://www.tutorialspoint.com/nodejs/nodejs_file_system.htm
fs.open('mynewfile2.txt', 'w', function (err, file) {
  if (err) throw err;
  console.log('Saved!',file);
});