let app = require('./module');
let app2 = require('./module2');

console.log(app.counter(["a", "b", "c"]));
console.info(typeof app.pi);
console.log(app.pi);
console.log(app.sum(51,10));
console.log(app.sum(Number(app.pi),10));


