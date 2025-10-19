console.log('Main module is starting.');

const a = require('./A.js');
const b = require('./B.js');

console.log('in main, A.done', a.done);
