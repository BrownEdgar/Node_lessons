console.log("Node.js is running");

// // ---------------------------------------
console.log(__dirname);
console.log(__filename);
// // ---------------------------------------

let a = require('./m.js');
let moreModules = require('./multiplyModules.js');
 a(25);







console.log(moreModules.r);
console.log(moreModules.b);
console.log(moreModules.f());

