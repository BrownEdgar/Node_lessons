console.log("File B is loading...");

exports.done = false;

let a = require('./A.js');
console.log("in B, A.done", a.done);

exports.done = true;
console.log("File B is done");