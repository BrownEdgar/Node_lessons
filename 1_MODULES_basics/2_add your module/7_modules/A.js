console.log('File A is loading...');

exports.done = false;

const b = require('./B.js');

console.log('in A, B.done', b.done);

exports.done = true;
console.log('File A is done');
