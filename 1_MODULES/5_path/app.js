const path = require('path');
var fs = require('fs');

/*  path մոդուլը տրամադրում է գործիքներ Ֆայլերի ուղիների և դիրեկտորյաների հետ աշխատանքի համար */

//path.extname մեթոդը։ վերադարձնում է ֆայլի ընդլայնում
path.extname('index.html'); // '.html'

path.extname('index.coffee.md'); // '.md'

path.extname('index.'); // '.'

path.extname('index'); // ''

path.extname('.index'); // ''

let p = path.format({
	root: 'H:\\',
	dir: 'H:\\NODE LESSON\\5_path',
	base: 'test.txt'
});

console.log(`p: ${p}`);
// Կվերադարձնի: 'H:\NODE LESSON\5_path\test.txt'

let j = path.join('/foo', 'bar', 'baz/asdf', 'das', "/mas2", "../..");
console.log(`j: ${j}`); // Կվերադարձնի: 'j: \foo\bar\baz\asdf\das'
//".." - մեկ հարթակ վերև։ Վերջի մասնիկը չի արտածի․ այս դեպքում "/mas2"-ը
//"../․․" - երկու հարթակ վերև։
