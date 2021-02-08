console.log("Main module is starting.");

let a = require('./A.js');
let b = require('./B.js');
console.log("in main, A.done", a.done);