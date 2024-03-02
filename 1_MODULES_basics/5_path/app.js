const path = require('path');
const fs = require('fs');


console.log(1)
const data = fs.readFileSync(path.join(__dirname, 'test.txt'), "utf-8")
console.log(data)
console.log(2)




/*  path մոդուլը տրամադրում է գործիքներ Ֆայլերի ուղիների և դիրեկտորյաների հետ աշխատանքի համար */

//path.extname մեթոդը։ վերադարձնում է ֆայլի ընդլայնում
// path.extname('index.html'); // '.html'

// path.extname('index.coffee.md'); // '.md'

// path.extname('index.'); // '.'

// path.extname('index'); // ''

// path.extname('.index'); // ''

// let p = path.format({
// 	root: 'H:\\',
// 	dir: 'H:\\NODE LESSON\\5_path',
// 	base: 'test.txt'
// });

// console.log(`p: ${p}`);
// Կվերադարձնի: 'H:\NODE LESSON\5_path\test.txt'

//path.join()- ծառայում է ուղիների գեներացման համար
// let j = path.join('/foo', 'bar', 'baz/asdf', 'das', "/mas2", "../..");
// console.log(`j: ${j}`); // Կվերադարձնի: 'j: \foo\bar\baz\asdf\das'
//".." - մեկ հարթակ վերև։ Վերջի մասնիկը չի արտածի․ այս դեպքում "/mas2"-ը
//"../․․" - երկու հարթակ վերև։

// console.log(path.basename(__filename)); // app.js
// console.log(path.dirname(__filename)); // F:\NODE LESSON\1_MODULES_basics\5_path
// console.log(path.extname(__filename)); // .js
// console.log(path.join(__dirname, "test", "index.html")); // ...\5_path\test\index.html


// console.log(path.parse(__filename)); // վերծանում է ֆայլի ուղին վերադարձնելով մեզ օբյեկտ



